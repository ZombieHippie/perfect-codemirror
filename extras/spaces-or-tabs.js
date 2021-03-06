// Generated by CoffeeScript 1.7.1
(function() {
  window.checkToUseSpacesInsteadofTabs = function(cm) {
    var getYoSpaceCount, indentUnit, makeYoSpaces, putYoSpacesHere;
    if (cm.getOption("indentWithTabs")) {
      return CodeMirror.Pass;
    }
    indentUnit = cm.getOption("indentUnit");
    getYoSpaceCount = function(head) {
      var preceding, tabCount, tabreg;
      preceding = cm.getRange({
        line: head.line,
        ch: 0
      }, head);
      tabCount = 0;
      tabreg = /\t/g;
      while (tabreg.exec(preceding)) {
        tabCount++;
      }
      return indentUnit - (head.ch + tabCount * (indentUnit - 1)) % indentUnit;
    };
    makeYoSpaces = function(spaceCount) {
      var spaces, _i;
      spaces = "";
      for (_i = 1; 1 <= spaceCount ? _i <= spaceCount : _i >= spaceCount; 1 <= spaceCount ? _i++ : _i--) {
        spaces += " ";
      }
      return spaces;
    };
    putYoSpacesHere = function(range) {
      var anchor, curLine, curPos, head, line, _i, _ref, _ref1, _results;
      anchor = range.anchor, head = range.head;
      if (anchor.line !== head.line && anchor.ch !== head.ch) {
        _results = [];
        for (line = _i = _ref = anchor.line, _ref1 = head.line; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; line = _ref <= _ref1 ? ++_i : --_i) {
          curLine = cm.getLine(line);
          curPos = {
            line: line,
            ch: 0
          };
          _results.push(cm.replaceRange(makeYoSpaces(indentUnit), curPos, curPos));
        }
        return _results;
      } else {
        return cm.replaceRange(makeYoSpaces(getYoSpaceCount(head)), anchor, head);
      }
    };
    return cm.doc.sel.ranges.forEach(putYoSpacesHere);
  };

}).call(this);
