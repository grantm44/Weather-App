'use strict';

function skyIcon(dataService){
  var _dataService = dataService;
  return {
    retrict: 'E',
    link: linkFn
  }
  function linkFn(scope, element, attrs){
    var canvas = document.createElement( "canvas" );
    canvas.height = 40;
    canvas.width = 40;

    var iconType = attrs['iconType']; 
    _dataService.add(canvas, iconType);
    _dataService.play();
    
    if ( element[0].nodeType === 8 ) {
        element.replaceWith( canvas );
    } else {
        element[0].appendChild( canvas );
    }
  
  }

}

module.exports = skyIcon;