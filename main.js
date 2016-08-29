let _Sites = require("_sites");
let _Hive = require("_hive");

module.exports.loop = function () {

    /* To do:
	
		* Needs debugging!!!
			- Terminal code working?
				- Terminal requests functioning?
				- Tasks being created for courier to fill terminals?
				- If functioning: uncomment terminal.send() so it'll work!						
			        
		* _Hive.runEconomy
			- ensure a courier is available and working! May need to invoke a _Sites.Industry for it?
			- add standing terminal withdraw tasks (but don't overlap with orders!)
				- for (let resource in terminal.store) { create "withdraw" task for courier }			
			
		* CPU management
            - add wait task for multirole!
			- implement creeps moving by path? e.g.:
				if (creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND) {
					creep.memory.path = creep.pos.findPathTo(destination);
					creep.moveByPath(creep.memory.path)
				}        

        * _Tasks
            - add dismantle tasks
            - utilCreep: add resource types to all tasks? e.g. "withdraw"
			
		* Logs
			- CPU profiling of some sort??
    */      


    /* Prepare _Hive functions/memory for this tick */
    _Hive.clearDeadMemory();
    _Hive.initMemory();
    _Hive.initTasks();
	_Hive.processRequests();
	//_Hive.runEconomy();
	

    /* Colony #1, W18S43 */
    _Sites.Colony("W18S43", 2,
            { worker:   {level: 6, amount: 1},
              repairer: {level: 6, amount: 1},
              upgrader: {level: 7, amount: 1} },
            [{id: "57a2465268244ab107a96d5e", role: "send"},
             {id: "57a24a31e620955e29e63e27", role: "send"},
             {id: "57a24f9cacbffcb869dc9d21", role: "receive"},
             {id: "57a25c61958cffd536325056", role: "receive"}]);
    _Sites.Mining("W18S43", "W18S43", 2,
            { burrower:  {level: 7, amount: 1},
              carrier:   {level: 7, amount: 2} } );
	_Sites.Industry("W18S43", 2,
            { courier:   {level: 5, amount: 1} },
            [ { action: "reaction", 
				reactor: {mineral: "UL", lab: "579f9f2549708a4306732b3e"}, 
				supply1: {mineral: "U", lab: "57a0539e25bdfd7a71d9a527"}, 
				supply2: {mineral: "L", lab: "57bc412f58d9edd776d1a39e"} } ],
			[ { type: "industry", subtype: "withdraw", 
				resource: "U",
				id: "57a03063c20303fd1e5e125a",
				timer: 10, creeps: 8, priority: 3 
			},{ type: "industry", subtype: "deposit", 
				resource: "L",
				id: "57a03063c20303fd1e5e125a",
				timer: 10, creeps: 8, priority: 3 
			} ] );
			
    /* Colony #2, W19S42 */
    _Sites.Colony("W19S42", 2,
            { worker:   {level: 7, amount: 2},
              repairer: {level: 6, amount: 1},
              upgrader: {level: 6, amount: 1} },
            [{id: "57a23067cf975f59293d8a28", role: "send"},
             {id: "57a23201113c59e97f7e364e", role: "receive"},
             {id: "57a6a9d62d673fac4f21a62a", role: "receive"}]);    
    _Sites.Mining("W19S42", "W19S42", 2,
            { burrower:  {level: 6, amount: 1},
              carrier:   {level: 6, amount: 2},              
              extractor: {level: 6, amount: 1} } );

    /* Colony #3, W15S41 */
    _Sites.Colony("W15S41", 2,
            { worker:   {level: 6, amount: 1},
              repairer: {level: 6, amount: 1},
              upgrader: {level: 6, amount: 2} },
            [{id: "57abd1d35c977d2d5fec0d0f", role: "send"},
             {id: "57bcc544ee84657d138c5866", role: "send"},            
             {id: "57abe33f4a8b4b5a2f1a2b85", role: "receive"},
             {id: "57af99d528986c413c0a8f4c", role: "receive"}]);
    _Sites.Mining("W15S41", "W15S41", 2,
            { burrower:  {level: 6, amount: 1},
              carrier:   {level: 6, amount: 2},              
              extractor: {level: 6, amount: 2} } );
	_Sites.Industry("W15S41", 2,
            { courier:   {level: 5, amount: 1} },
            { boost: { action: "boost", mineral: "GH2O", lab: "57b27619ad1bf23613f2e881", role: "worker", subrole: "upgrader" } } );
				
    /* Colony #4, W15S43 */
    _Sites.Colony("W15S43", 2,
            { worker:   {level: 6, amount: 1},
              repairer: {level: 5, amount: 1},
              upgrader: {level: 6, amount: 2} } );      
    _Sites.Mining("W15S43", "W15S43", 2,
            { burrower:  {level: 4, amount: 1},
              carrier:   {level: 5, amount: 2} } );
	_Sites.Industry("W15S43", 1,
            { courier:   {level: 5, amount: 1} },
            { },
			[ { type: "industry", subtype: "withdraw", 
				resource: "U",
				id: "57b5cbedd1472abb57f262a8",
				timer: 10, creeps: 8, priority: 3 
			},{ type: "industry", subtype: "deposit", 
				resource: "U",
				id: "57be092c9611444d51e8d458",
				timer: 10, creeps: 8, priority: 3 
			} ] );
			
    /* Colony #5, W13S41 */
    _Sites.Colony("W13S41", 2,
            { worker:   {level: 5, amount: 1},
              repairer: {level: 4, amount: 1},
              upgrader: {level: 5, amount: 6} },              
            [{id: "57c04f3012c844604895d81f", role: "send"},             
             {id: "57c06b8698040e1908490daf", role: "receive"},
			 {id: "57c3eabdc480f8a72a2cdb75", role: "receive"}]);
    _Sites.Mining("W13S41", "W13S41", 3,
            { burrower:  {level: 4, amount: 2},
              carrier:   {level: 4, amount: 3},
			  extractor: {level: 6, amount: 2} } );
  	_Sites.Industry("W13S41", 2,
            { courier:   {level: 5, amount: 1} },
            { boost: { action: "boost", mineral: "GH2O", lab: "57c3ef8850ba39ec2725c182", role: "worker", subrole: "upgrader" } },
			[ { type: "industry", subtype: "withdraw", 
				resource: "energy",
				id: "57bcfb7755b7fdcc755571ba",
				timer: 10, creeps: 8, priority: 3 
			},{ type: "industry", subtype: "deposit", 
				resource: "energy",
				id: "57c3e85d4e9f13dc1dadbab4",
				timer: 10, creeps: 8, priority: 3 
			} ] );
              
    /* Colony #6, W11S44 */
    _Sites.Colony("W11S44", 1,
            { worker:   {level: 4, amount: 2},
              repairer: {level: 4, amount: 1},
              upgrader: {level: 4, amount: 2} });
    _Sites.Mining("W1144", "W11S44", 1,
            { burrower:  {level: 4, amount: 2},
              carrier:   {level: 4, amount: 3} } );
              

    /* Remote mining operations for Colony #1, W18S43 */
    _Sites.Mining("W18S43", "W17S43", 2,
            { burrower:  {level: 7, amount: 1},
              carrier:   {level: 7, amount: 3},
              multirole: {level: 6, amount: 1},
              reserver:  {level: 6, amount: 1} } );
    _Sites.Mining("W18S43", "W19S43", 2,
            { burrower:  {level: 5, amount: 1},
              carrier:   {level: 5, amount: 2},
              multirole: {level: 5, amount: 1},
              reserver:  {level: 5, amount: 1} } );
    _Sites.Mining("W18S43", "W17S42", 2,
            { burrower:  {level: 5, amount: 1},
              carrier:   {level: 5, amount: 2},
              multirole: {level: 5, amount: 1},
              reserver:  {level: 5, amount: 1} } );
    
    /* Remote mining operations for Colony #2, W19S42 */
    _Sites.Mining("W19S42", "W18S42", 2,
            { burrower:  {level: 7, amount: 1},
              carrier:   {level: 7, amount: 3},
              multirole: {level: 6, amount: 1},
              reserver:  {level: 6, amount: 1} } );
    
    /* Remote mining operations for Colony #3, W15S41 */
    _Sites.Mining("W15S41", "W15S42", 1,
            { burrower:  {level: 5, amount: 1},
              carrier:   {level: 6, amount: 3},
              multirole: {level: 5, amount: 1},
              reserver:  {level: 5, amount: 1} } );
    _Sites.Mining("W15S41", "W14S42", 2,
            { burrower:  {level: 6, amount: 1},
              carrier:   {level: 6, amount: 3},
              multirole: {level: 5, amount: 1},
              reserver:  {level: 5, amount: 1} } );
    _Sites.Mining("W15S41", "W16S41", 2,
            { multirole: {level: 3, amount: 1} } );
    _Sites.Mining("W15S41", "W14S41", 2,
            { multirole: {level: 3, amount: 1} } );
    _Sites.Mining("W15S41", "W16S42", 3,
            { burrower:  {level: 6, amount: 1},
              carrier:   {level: 6, amount: 3},
              multirole: {level: 5, amount: 1},
              reserver:  {level: 5, amount: 1} },
            ["W15S41", "W16S41", "W16S42"]);
    
    /* Remote mining operations for Colony #4, W15S43 */
    _Sites.Mining("W15S43", "W15S45", 0,
            { burrower:  {level: 5, amount: 4},
              carrier:   {level: 5, amount: 12, body: "all-terrain"},
              multirole: {level: 5, amount: 1} } );

    /* Remote mining operations for Colony #5, W13S41 */
    _Sites.Mining("W13S41", "W12S41", 1,
            { burrower:  {level: 4, amount: 1},
              carrier:   {level: 4, amount: 3},
              multirole: {level: 4, amount: 1},
              reserver:  {level: 4, amount: 1} } );
    _Sites.Mining("W13S41", "W13S42", 2,
            { burrower:  {level: 4, amount: 1},
              carrier:   {level: 4, amount: 3},
              multirole: {level: 4, amount: 1},
              reserver:  {level: 4, amount: 1} } );


    /* Run end-tick _Hive functions */
    _Hive.processSpawnRequests();
    _Hive.processSpawnRenewing();
}
