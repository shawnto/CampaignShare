import Marked from 'marked';


module.exports = function md(markdownContent){

  if (markdownContent == null){
    return '__Loading...__'
  }
  else{
    return Marked(markdownContent, {sanitize: true})
  }
}
