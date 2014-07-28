window.checkToUseSpacesInsteadofTabs = (cm) ->
  if(cm.getOption("indentWithTabs"))
      return CodeMirror.Pass
  indentUnit = cm.getOption("indentUnit")
  getYoSpaceCount = (head) ->
      # Use preceding to determine what room is taken by tabs
      preceding = cm.getRange {line:head.line, ch:0}, head
      tabCount = 0
      tabreg = /\t/g
      while(tabreg.exec preceding)
          tabCount++
      return indentUnit - (head.ch + tabCount*(indentUnit - 1)) % indentUnit
  makeYoSpaces = (spaceCount) ->
      spaces = ""
      for [1..spaceCount]
          spaces += " "
      return spaces
  putYoSpacesHere = (range) ->
      {anchor, head} = range
      if anchor.line isnt head.line and anchor.ch isnt head.ch
          for line in [anchor.line...head.line]
              curLine = cm.getLine(line)
              curPos = {line, ch:0}
              cm.replaceRange makeYoSpaces(indentUnit), curPos, curPos
          #anchor.ch += indentUnit
          #head.ch += indentUnit
      else
          cm.replaceRange makeYoSpaces(getYoSpaceCount(head)), anchor, head
  cm.doc.sel.ranges.forEach putYoSpacesHere