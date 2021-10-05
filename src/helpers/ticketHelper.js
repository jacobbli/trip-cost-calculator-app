function copyText() {
  var element =document.getElementById('cost-table');

  var body = document.body, range, sel;
  if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
          range.selectNodeContents(element);
          sel.addRange(range);
      } catch (e) {
          range.selectNode(element);
          sel.addRange(range);
      }
      document.execCommand("copy");

  } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(element);
      range.select();
      range.execCommand("Copy");
  }
}

module.exports = {
    copyText
  }