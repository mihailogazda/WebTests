
//  RAW MAP DRAWING / LEVEL EDITOR :)

var rawMap1 = [
    "      @   @                              @          @              ",
    " @  @         @        @         @   @       @    @    @           ",
    "         @        @           @           @                   @     ",
    "  @                       @                  @   @          @     ",
    "                 **                 ***       *                               ",
    "            *   ----  ***   *      -----                       ",
    "  P        ---        **   ***           ---                ",
    "f     ?bsg            *** ** **       g    bggs        sb!bgggb  gf      ",
    "##################################################################"
];

var rawMap2 = [
    "      @   @                              @          @              ",
    " @  @         @        @c*       @   @       @    @    @           ",
    "         @              --      @        @                   @     ",
    "  @      *        @     *  @         s               @          @  ",
    "        ---   @        ----        -----   @   *           @       ",
    "                          *         ***       ***                  ",
    "                 ----     ----               *****-                ",
    "Fg P  ? sb  b    c*       c  b   sg        b  g           ! b  gggb",
    "#############   #######   ####  ########  #########################",
    "    @        *         *c    @      @                              ",
    " @    @     ####    #####       @       @                          ",
    "         @            @   @          @    @                       ",
    "   @   @          @           @                                    "
];

var rawMap3 = [
    "      @   @                              @          @              ",
    " @  @         @        @c*       @   @       @    @    @           ",
    "         @              --      @    *   @                   @     ",
    "  @               @     *  @        ***        ---   @          @  ",
    "fP ?          @        ----        -----   @   *        ***@ *     ",
    "#######                          *         ***       ***    ###    ",
    "      ##              ----     ----          -    *****-   #####      ",
    "       ##   sb  b    c*          b   sg        b  g       #######     sb!bgggb",
    "#######################   ####  ########  ####################################"
];

var rawMap4 = [    
    "         @               --      @        @                   @               ",
    "  @               @     *  @                          @          @           ",
    "           @         *                                                          ",        
    "gsf  P ?            ***                     !gbs                              ",
    "#########     ##############               ########                            ",
    "        ##            *                               **                       ",
    "         ##         c***                       ----  ----           *     **   ****  " ,
    "          ##        -----              -----                ---    ***   ****  ****  ",
    "           ##    g  sb         bs      c*b**         *****        *****g  ** s **** bf",
    "            ######################   #######################    ######################",
    "                                      ********************    ",
    "                                  ######################### ",
    "                                                         ###",
    "                                                           ###            !gsbf",
    "                                                             ##################"
];

var mapIntro = {
    pointsWanted : 10,
    get: function(str){
        switch (str){
            case "P": return Crafty.asset(assetCharacterFront);            
            case "#": return Crafty.asset(assetGround);
            case "-": return Crafty.asset(assetBlock);
            case "~": return Crafty.asset(assetWater);
            case "*": return Crafty.asset(assetCoin);
            case "f": return Crafty.asset(assetFence);
            case "F": return Crafty.asset(assetFenceBroken);
            case "c": return Crafty.asset(assetCrate);
            case "g": return Crafty.asset(assetGrass);
            case "s": return Crafty.asset(assetShroom);
            case "b": return Crafty.asset(assetBush);
            case "@": return [
                    Crafty.asset(assetCloud),
                    Crafty.asset(assetCloud2),
                    Crafty.asset(assetCloud3)
                ];
            case "?": return Crafty.asset(assetStart);            
            case "!": return Crafty.asset(assetExit);            
        }
    },
    map: function(){
        return rawMap1;
    }
};

var map2 = {
  pointsWanted: 15,
  get: function(str){
      return mapIntro.get(str);
  },
  map: function(){
      return rawMap2;
  }
};

var map3 = {
  pointsWanted: 20,
  get: function(str){
      return mapIntro.get(str);
  },
  map: function(){
      return rawMap3;
  }
};

var map4 = {
  pointsWanted: 30,
  get: function(str){
      return mapIntro.get(str);
  },
  map: function(){
      return rawMap4;
  }
};