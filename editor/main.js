


//
//  ENTRY LEVEL
//

$(window)
    .ready(function () {
        //  START
        //
        //  Setup grid
        LEUtils.setupViewport(120, 120);

        LEMenu.init();
        LEFileSystem.init();
    
        LEUtils.setupSelection(true);
        LEUtils.setupRightClick();
        LEUtils.setupRightColumn();
        LEUtils.setupToolbarItems();

    });