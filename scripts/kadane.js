

let script = [];



class Snapshot {

	_vars_map = {};

	set(key, value) {

		this._vars_map[key] = value;

		this._log();
	}

	_log() {
		script.push(structuredClone(this._vars_map));
	}

};





function kadaneAlgorithm(arr) {

	let snapshot = new Snapshot();
	snapshot.set('arr', arr);

    if (arr.length === 0) {
        return 0;
    }

    let maxEndingHere = arr[0];		snapshot.set('maxEndingHere', maxEndingHere);
    let maxSoFar = arr[0]; 			snapshot.set('maxSoFar', maxSoFar);
    	
    let i = 0;						snapshot.set('i', i);						

    for (i = 1; i < arr.length; i++) {

    	snapshot.set('i', i);

        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);   snapshot.set('maxEndingHere', maxEndingHere);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);   			snapshot.set('maxSoFar', maxSoFar);
    }

    return maxSoFar;
}


$(document).ready(function() {
	
	// Example usage:
	const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
	const maxSubarraySum = kadaneAlgorithm(array);
	console.log("Maximum subarray sum is:", maxSubarraySum);




});




function getComponentRenderLogic() {

	return {

		'arr': (value) => {
			console.log('create arr', value);


			let arr_all = '<div style="position:absolute;top:100px;left:200px">';
			let arr_div_single = (i) => '<div id="arr_'+i+'" style="min-height:100px;min-width:100px;background-color:yellow;display:inline-table;border:1px solid;text-align:center;font-size:2em">'+value[i]+'</div>';

			for (let i = 0; i < value.length; i++)
				arr_all += arr_div_single(i);

			arr_all += '</div>';

			$('#main_frame').append(arr_all);

		},


		'i': (value) => {
			console.log('i', value);

			$('#arr_'+value).css('background-color', 'red');
		},


		'maxEndingHere': (value) => {
			console.log('maxEndingHere', value);
		},


		'maxSoFar': (value) => {
			console.log('maxSoFar', value);
		},
	};

}

function render(shot, rlogic) {

	console.log('------------------------');

	console.log(shot, rlogic);

	clearMainFrame();

	Object.keys(shot).forEach(function(key) {
		if (typeof rlogic[key] === 'function') rlogic[key](shot[key]);
	})
}


function clearMainFrame() {
	$('#main_frame').empty();
}





let frame_i = 0;



function goPrev() {
	frame_i = Math.max(frame_i-1, 0);
	render(script[frame_i], getComponentRenderLogic());
}


function goNext() {
	frame_i = Math.min(frame_i+1, script.length-1);
	render(script[frame_i], getComponentRenderLogic());
}