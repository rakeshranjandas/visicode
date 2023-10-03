

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

    for (let i = 1; i < arr.length; i++) {

    	snapshot.set('i', i);

        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);   snapshot.set('maxEndingHere', maxEndingHere);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);   			snapshot.set('maxSoFar', maxSoFar);
    }

    return maxSoFar;
}

// Example usage:
const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const maxSubarraySum = kadaneAlgorithm(array);
console.log("Maximum subarray sum is:", maxSubarraySum);



animate();





function animate() {

	let rlogic = createComponentRenderLogic();


	console.log(script, rlogic);

	script.forEach(function(shot) {
		render(shot, rlogic);
	});
}


function createComponentRenderLogic() {

	return {

		'arr': (value) => {
			console.log('create arr', value);
		},


		'i': (value) => {
			console.log('i', value);
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

	Object.keys(shot).forEach(function(key) {
		if (typeof rlogic[key] === 'function') rlogic[key](shot[key]);
	})
}
