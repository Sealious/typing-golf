//heavilly inspired by https://raw.githubusercontent.com/barmalei/zebra/8adb4a7a5d831447d9d5dd5958efaccd2e7eaf53/src/ui.TextField.js

function AbstractTextField(){

}

AbstractTextField.prototype = new function(){
	this.findNextWord = function(t, line, col, d){
		if (line < 0 || line >= t.getLines()) return null;

		var ln = t.getLine(line);
		col += d;
		if (col < 0 && line > 0) {
			return [line - 1, t.getLine(line - 1).length];
		}
		else {
			if (col > ln.length && line < t.getLines() - 1) return [line + 1, 0];
		}

		var b = false;
		for(; col >= 0 && col < ln.length; col += d){
			if (b) {
				if (d > 0) {
					if (zebra.util.isLetter(ln[col])) return [line, col];
				}
				else {
					if (!zebra.util.isLetter(ln[col])) return [line, col + 1];
				}
			}
			else  {
				b = d > 0 ? !zebra.util.isLetter(ln[col]) : zebra.util.isLetter(ln[col]);
			}
		}
		return (d > 0 ? [line, ln.length ]: [line, 0]);
	};

	this.getSubString = function(r,start,end){
		var res = [], sr = start[0], er = end[0], sc = start[1], ec = end[1];
		for(var i = sr; i < er + 1; i++){
			var ln = r.getLine(i);
			if (i != sr) res.push('\n');
			else ln = ln.substring(sc);
			if (i == er) ln = ln.substring(0, ec - ((sr == er) ? sc : 0));
			res.push(ln);
		}
		return res.join('');
	};

	this.removeSelected = function(){
		if (this.hasSelection()){
			var start = this.selectionStart < this.selectionEnd ? this.selectionStart : this.selectionEnd;
			this.remove(start, (this.selectionStart > this.selectionEnd ? this.selectionStart : this.selectionEnd) - start);
			this.clearSelection();
		}
	};

	this.startSelection = function() {
		if (this.selectionStart < 0 && this.position != null){
			var pos = this.position;
			this.endLine = this.startLine = pos.currentLine;
			this.endCol = this.startCol = pos.currentCol;
			this.selectionEnd = this.selectionStart = pos.offset;
		}
	};

	this.keyTyped = function(e) {
		if (this.isEditable === true && e.isControlPressed() == false && e.isCmdPressed() == false) {
			this.write(this.position.offset, e.ch);
		}
	};

	this.selectAll_command = function() {
		this.select(0, this.getMaxOffset());
	};

	this.nextWord_command = function(b, d) {
		if (b) this.startSelection();
		var p = this.findNextWord(this.view.target, this.position.currentLine,
			this.position.currentCol, d);
		if (p != null) {
			this.position.setRowCol(p[0], p[1]);
		}
	};

	this.keyPressed = function(e) {
		if (this.isFiltered(e) === false)  {
			var position    = this.position,
				col         = position.currentCol,
				isShiftDown = e.isShiftPressed(),
				line        = position.currentLine,
				foff        = 1;


			if (isShiftDown) {
				this.startSelection();
			}

			switch(e.code) {
				case KE.DOWN : position.seekLineTo(PO.DOWN);break;
				case KE.UP   : position.seekLineTo(PO.UP);break;
				case KE.LEFT : foff *= -1;
				case KE.RIGHT:
					if (e.isControlPressed() === false && e.isCmdPressed() === false) {
						position.seek(foff);
					}
					break;
				case KE.END:
					if (e.isControlPressed()) {
						position.seekLineTo(PO.DOWN, this.getLines() - line - 1);
					}
					else position.seekLineTo(PO.END);
					break;
				case KE.HOME:
					if (e.isControlPressed()) position.seekLineTo(PO.UP, line);
					else position.seekLineTo(PO.BEG);
					break;
				case KE.DELETE:
					if (this.hasSelection() && this.isEditable === true) {
						this.removeSelected();
					}
					else {
						if (this.isEditable === true) this.remove(position.offset, 1);
					} break;
				case KE.BSPACE:
					if (this.isEditable === true) {
						if (this.hasSelection()) this.removeSelected();
						else {
							if (this.isEditable === true && position.offset > 0){
								position.seek(-1 * foff);
								this.remove(position.offset, 1);
							}
						}
					} break;
				default: return ;
			}

			if (isShiftDown === false) {
				this.clearSelection();
			}
		}
	};

	this.isFiltered = function(e){
		var code = e.code;
		return code == KE.CTRL ||
		code == KE.TAB   || code == KE.ALT  ||
		(e.mask & KE.M_ALT) > 0;
	};

	this.remove = function (pos,size){
		if (this.isEditable === true) {
			var position = this.position;
			if (pos >= 0 && (pos + size) <= this.getMaxOffset()) {
				if (size < 10000) {
					this.historyPos = (this.historyPos + 1) % this.history.length;
					this.history[this.historyPos] = [-1, pos, this.getValue().substring(pos, pos+size)];
					if (this.undoCounter < this.history.length) this.undoCounter++;
				}

				if (this.view.target.remove(pos, size)) {
					return true;
				}
			}
		}
		return false;
	};

	this.write = function (pos,s) {
		if (this.isEditable === true) {
			// TODO: remove hard coded undo/redo deepness value
			if (s.length < 10000) {
				this.historyPos = (this.historyPos + 1) % this.history.length;
				this.history[this.historyPos] = [1, pos, s.length];
				if (this.undoCounter < this.history.length) this.undoCounter++;
			}

			if (this.view.target.write(s, pos)) {
				return true;
			}
		}
		return false;
	};

	this.recalc = function() {
		var r = this.view;
		if (this.position.offset >= 0) {
			var l = r.getLine(this.position.currentLine);
			if (this.textAlign === zebra.layout.LEFT) {
				this.curX = r.font.charsWidth(l, 0, this.position.currentCol) + this.getLeft();
			}
			else {
				this.curX = this.width - this.getRight() - this.view.getPreferredSize().width +
				r.font.charsWidth(l, 0, this.position.currentCol);
			}

			this.curY = this.position.currentLine * (r.getLineHeight() + r.getLineIndent()) +
			this.getTop();
		}

		this.curH = r.getLineHeight() - 1;
	};

	this.select = function (startOffset,endOffset){
		if (endOffset < startOffset || startOffset < 0 || endOffset > this.getMaxOffset()) {
			throw new Error("Invalid selection offsets");
		}
		if (this.selectionStart != startOffset || endOffset != this.selectionEnd){
			if (startOffset == endOffset) this.clearSelection();
			else {
				this.selectionStart = startOffset;
				var p = this.position.getPointByOffset(startOffset);
				this.startLine = p[0];
				this.startCol  = p[1];
				this.selectionEnd    = endOffset;
				p = this.position.getPointByOffset(endOffset);
				this.endLine = p[0];
				this.endCol = p[1];
			}
		}
	};

	this.hasSelection = function () {
		return this.selectionStart != this.selectionEnd;
	};

	this.getStartSelection = function(){
		return this.selectionStart != this.selectionEnd ? ((this.selectionStart < this.selectionEnd) ? [this.startLine, this.startCol] : [this.endLine, this.endCol]) : null;
	};

	this.getEndSelection = function(){
		return this.selectionStart != this.selectionEnd ? ((this.selectionStart < this.selectionEnd) ? [this.endLine, this.endCol] : [this.startLine, this.startCol]) : null;
	};
	this.getSelectedText = function(){
		return this.selectionStart != this.selectionEnd ? this.getSubString(this.view, this.getStartSelection(), this.getEndSelection()) : null;
	};

	this.getLines = function() {
		return this.position == null ? -1 : this.position.metrics.getLines();
	};

	this.getMaxOffset = function() {
		return this.position == null ? -1 : this.position.metrics.getMaxOffset();
	};

	this.clearSelection = function (){
		if (this.selectionStart >= 0){
			var b = this.hasSelection();
			this.selectionEnd = this.selectionStart = -1;
		}
	};

	this.clipPaste = function(txt){
		if (txt != null){
			this.removeSelected();
			this.write(this.position.offset, txt);
		}
	};

	this.clipCopy = function() {
		return this.getSelectedText();
	};

	this.cut = function() {
		var t = this.getSelectedText();
		if (this.isEditable === true) this.removeSelected();
		return t;
	};

	this.setPosition = function (p){
		if (this.position != p) {
			if (this.position != null) {
				this.position.unbind(this);
			}
			this.position = p;
			if (this.position != null) {
				this.position.bind(this);
			}
			this.invalidate();
		}
	};
}
