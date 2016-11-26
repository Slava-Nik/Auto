window.addEventListener("load", highlightMenu);


function highlightMenu() {
   
    var menu = document.getElementById("toggle-menu");
    var menuItems = menu.getElementsByTagName("A");

    var triggers = document.getElementsByClassName("complect-name");
    var triggPos = findElemsPositions();

    var currentItem = null; 
    var visibleElem = null;



    function findElemsPositions() {
        var currentScrollY = window.pageYOffset;
        window.scrollTo(0,0);

        var triggPos = [];

        for(var i = 0; i < triggers.length; i++) {
            var coordTop = (triggers[i].getBoundingClientRect().top - 5);
            var triggerData = {elem: triggers[i], scrollPosition: coordTop};
            triggPos.push(triggerData);
        }
        window.scrollTo(0,currentScrollY);
        return triggPos;
    }
    


    function findVisibleElem(triggPos) {

        var pageY = window.pageYOffset;
        var visibleElemIndex = null;

        for( var i = 0; i < triggPos.length; i++) {
            if( pageY >= triggPos[i].scrollPosition) {
                visibleElemIndex  = i;
            }else {
                if(visibleElemIndex !== null ) {
                    visibleElemIndex = visibleElemIndex;
                    visibleElem = menuItems[visibleElemIndex];
                    return visibleElem;
                }else {
                    return null;
                }
            }
        }
        return menuItems[visibleElemIndex];
    }


    function cancelHighlighting(item) {
        if(item) {
            item.classList.remove("toggle-item-active");
        }
    }
    
    
    window.addEventListener("resize", function(){ triggPos = findElemsPositions(); });
       
    document.onscroll = function(event) {

        visibleElem = findVisibleElem(triggPos);
        
        if( !visibleElem ){
            cancelHighlighting(currentItem);
        }else {
            cancelHighlighting(currentItem);
            visibleElem.classList.add("toggle-item-active");
            currentItem = visibleElem;
        }
        return;
    };

}
