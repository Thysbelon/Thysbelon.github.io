var n64LoopStart;
AudioWorkletGlobalScope.n64Loop = function (s, type, event, data) { // async cannot be used here
	if (type === 176) { // control change 0xb0
		if (event.getControl() === 103 && event.getChannel() === 0) { // cc number
			s.seekPlayer(n64LoopStart);
			return true;
		} else if (event.getControl() === 102 && n64LoopStart==null) {
			//n64LoopStart= s.retrievePlayerCurrentTick();
			s.retrievePlayerCurrentTick().then(function(result){ if(n64LoopStart==null){n64LoopStart=result;console.log(n64LoopStart)} })
			//console.log(n64LoopStart);
		}
	}
	return false;
};