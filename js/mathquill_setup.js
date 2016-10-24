const mathquillSetup = () => {

  var mathFieldSpan1 = document.getElementById('expression1');
  var mathFieldSpan2 = document.getElementById('expression2');

  let replaceText = function(txt) {
    txt = txt.replace("\\l*o*g *", "log10");
    txt = txt.replace("\\l*n *", "log");
    txt = txt.replace("\\s*i*n *", "sin");
    txt = txt.replace("\\c*o*s *", "cos");
    txt = txt.replace("\\t*a*n *", "tan");
    txt = txt.replace("a*b*s*", "abs");
    txt = txt.replace("(*", "(");
    txt = txt.replace("*)", ")");
    return txt;
  }

  var MQ = MathQuill.getInterface(2);
  var mathField1 = MQ.MathField(mathFieldSpan1, {
    spaceBehavesLikeTab: true,
    autoCommands: 'pi theta sqrt sum',
    handlers: {
      edit: function() {
        let hiddenExpression1 = document.getElementById("hidden-expression-1");
        hiddenExpression1.innerHTML = replaceText(mathField1.text());
      }
    }
  });

  var mathField2 = MQ.MathField(mathFieldSpan2, {
    spaceBehavesLikeTab: true,
    autoCommands: 'pi theta sqrt sum',
    handlers: {
      edit: function() {
        let hiddenExpression2 = document.getElementById("hidden-expression-2");
        hiddenExpression2.innerHTML = replaceText(mathField2.text());
      }
    }
  });
}

export default mathquillSetup;
