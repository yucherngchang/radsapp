function loadImage() {
    [].forEach.call(document.querySelectorAll('.titles'), function (el) {
        el.style.visibility = 'hidden';
    });
	
	[].forEach.call(document.querySelectorAll('#check'), function (el) {
        el.style.visibility = 'visible';
    });
    [].forEach.call(document.querySelectorAll('#filterButton'), function (el) {
        el.style.visibility = 'hidden';
    });

    document.getElementById("tutorialblock").textContent = '';
    [].forEach.call(document.querySelectorAll('.tutorialBlock'), function (el) {
        el.style.visibility = 'hidden';
    });

    var data = Papa.parse(getcsv());

    var filtered = document.getElementById("filter").innerHTML.split("|");

    [].forEach.call(document.querySelectorAll('input[type=checkbox]'), function (el) {
        el.checked = false;
        if (!filtered.includes(el.value)) {
            el.disabled = true;
        }
    });
	
    var flag = 0;
    while (flag == 0) {
        var ind = Math.floor(Math.random() * (data.data.length - 1));
		var answer=data.data[ind][1].split("|");
		if (answer.every(val => filtered.includes(val))){
			flag=1;
			document.getElementById("image").src = "./images/" + data.data[ind][0];
			document.getElementById("secret").innerHTML = data.data[ind][1];
			[].forEach.call(document.querySelectorAll('.answer'), function (el) {
				el.style.visibility = 'visible';
			});
		}
    }

    document.getElementById("reveal").innerHTML = "";
    document.getElementById("check").disabled = false;
	magnify("image", 3);
}

function filter() {
    [].forEach.call(document.querySelectorAll('.titles'), function (el) {
        el.style.visibility = 'hidden';
    });
    [].forEach.call(document.querySelectorAll('.answer'), function (el) {
        el.style.visibility = 'visible';
    });
    [].forEach.call(document.querySelectorAll('input[type=checkbox]'), function (el) {
        el.checked = true;
        el.disabled = false;
    });
    [].forEach.call(document.querySelectorAll('#check'), function (el) {
        el.style.visibility = 'hidden';
    });
    [].forEach.call(document.querySelectorAll('#filterButton'), function (el) {
        el.style.visibility = 'visible';
    });

}

function filterCases() {
    var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');

    var str = "";
    for (let i = 0; i < checkedBoxes.length; i++) {
        str = str + checkedBoxes[i].value + "|";
    }
    document.getElementById("filter").innerHTML = str.slice(0, -1);
}

function loadTutorial() {
    [].forEach.call(document.querySelectorAll('.titles'), function (el) {
        el.style.visibility = 'hidden';
    });
    [].forEach.call(document.querySelectorAll('.tutorialBlock'), function (el) {
        el.style.visibility = 'visible';
    });
    [].forEach.call(document.querySelectorAll('.answer'), function (el) {
        el.style.visibility = 'hidden';
    });
    var text = ["blunting of costophrenic recesses", "opacity >3 cm diameter", "retrocardiac stomach, retrocardiac air-fluid levels",
        "heart >50% of thoracic cavity", "opacity <3 cm diameter",
        "increased opacification with displacement of lung fissures",
        "flattening of the bilateral hemidiaphragms, increased lung volumes, increased AP diameter",
        "multiple opacities", "lucency w/o vascular markings, mediastinal shift"];
    document.getElementById("tutorialblock").textContent = '';

    var checkedBoxes = document.querySelectorAll('input[type=checkbox]');

    var choices = [];
    for (let i = 0; i < checkedBoxes.length; i++) {
        choices[i] = checkedBoxes[i].value;
    }
    console.log(choices);

    for (let i = 1; i < choices.length; i++) {
        var newA = document.createElement("button");
        var linkText = document.createTextNode(choices[i]);
        newA.appendChild(linkText);
        newA.id = choices[i];
        newA.onclick = function () {
            document.getElementById("image").src = "./tutimages/" + choices[i] + ".jpg";
        };
        var newP = document.createElement("p");
        newP.innerHTML = text[i - 1];
        document.getElementById("tutorialblock").insertBefore(newP, document.getElementById("tutorialblock").firstChild);
        document.getElementById("tutorialblock").insertBefore(newA, document.getElementById("tutorialblock").firstChild);
    }

}



function check() {
    var str = document.getElementById("secret").innerHTML;
    var answers = str.split("|");

    var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');

    var checked = [];
    for (let i = 0; i < checkedBoxes.length; i++) {
        checked[i] = checkedBoxes[i].value;
    }
    var score = document.getElementById("score").innerHTML;
    var scoreSplit = score.split("/");
    if (arraysEqual(checked, answers) == true) {
        document.getElementById("score").innerHTML = (Number(scoreSplit[0]) + 1).toString() + "/" + (Number(scoreSplit[1]) + 1).toString();
        document.getElementById("reveal").innerHTML = "Correct, your score is " + document.getElementById("score").innerHTML;
    } else {
        var str2 = "";
        for (let i = 0; i < answers.length; i++) {
            str2 = str2 + " " + answers[i];
        }
        document.getElementById("score").innerHTML = Number(scoreSplit[0]).toString() + "/" + (Number(scoreSplit[1]) + 1).toString();
        document.getElementById("reveal").innerHTML = "Incorrect, answers are " + str2 + ". Your score is " + document.getElementById("score").innerHTML;
        document.getElementById("check").disabled = true;
    }
}

function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}

function getcsv() {
    return `Image Index,Finding Labels,Follow-up #,Patient ID,Patient Age,Patient Gender,View Position,OriginalImage[Width,Height],OriginalImagePixelSpacing[x,y]
00000001_000.png,Cardiomegaly,0,1,57,M,PA,2682,2749,0.14300000000000002,0.14300000000000002
00000001_001.png,Cardiomegaly|Emphysema,1,1,58,M,PA,2894,2729,0.14300000000000002,0.14300000000000002
00000001_002.png,Cardiomegaly|Effusion,2,1,58,M,PA,2500,2048,0.168,0.168
00000002_000.png,No Finding,0,2,80,M,PA,2500,2048,0.171,0.171
00000003_001.png,Hernia,0,3,74,F,PA,2500,2048,0.168,0.168
00000003_002.png,Hernia,1,3,75,F,PA,2048,2500,0.168,0.168
00000003_003.png,Hernia|Infiltration,2,3,76,F,PA,2698,2991,0.14300000000000002,0.14300000000000002
00000003_004.png,Hernia,3,3,77,F,PA,2500,2048,0.168,0.168
00000003_005.png,Hernia,4,3,78,F,PA,2686,2991,0.14300000000000002,0.14300000000000002
00000003_006.png,Hernia,5,3,79,F,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000003_007.png,Hernia,6,3,80,F,PA,2582,2905,0.14300000000000002,0.14300000000000002
00000003_000.png,Hernia,7,3,81,F,PA,2582,2991,0.14300000000000002,0.14300000000000002
00000004_000.png,Mass|Nodule,0,4,82,M,AP,2500,2048,0.168,0.168
00000005_000.png,No Finding,0,5,69,F,PA,2048,2500,0.168,0.168
00000005_001.png,No Finding,1,5,69,F,AP,2500,2048,0.168,0.168
00000005_002.png,No Finding,2,5,69,F,AP,2500,2048,0.168,0.168
00000005_003.png,No Finding,3,5,69,F,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000005_004.png,No Finding,4,5,70,F,PA,2986,2991,0.14300000000000002,0.14300000000000002
00000005_005.png,No Finding,5,5,70,F,PA,2514,2991,0.14300000000000002,0.14300000000000002
00000005_006.png,Infiltration,6,5,70,F,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000005_007.png,Effusion|Infiltration,7,5,70,F,PA,2566,2681,0.14300000000000002,0.14300000000000002
00000006_000.png,No Finding,0,6,81,M,PA,2500,2048,0.168,0.168
00000007_000.png,No Finding,0,7,82,M,PA,2500,2048,0.168,0.168
00000008_000.png,Cardiomegaly,0,8,68,F,PA,2048,2500,0.171,0.171
00000008_001.png,No Finding,1,8,70,F,PA,2048,2500,0.171,0.171
00000008_002.png,Nodule,2,8,72,F,PA,2048,2500,0.168,0.168
00000009_000.png,Emphysema,0,9,72,M,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000010_000.png,Infiltration,0,10,84,F,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000011_000.png,Effusion,0,11,74,M,PA,2638,2449,0.14300000000000002,0.14300000000000002
00000011_001.png,No Finding,1,11,74,M,PA,2500,2048,0.168,0.168
00000011_002.png,No Finding,2,11,75,M,PA,2714,2781,0.14300000000000002,0.14300000000000002
00000011_003.png,No Finding,3,11,75,M,PA,2500,2048,0.168,0.168
00000011_004.png,No Finding,4,11,75,M,PA,2500,2048,0.168,0.168
00000011_005.png,Infiltration,5,11,75,M,AP,2500,2048,0.168,0.168
00000011_006.png,Atelectasis,6,11,75,M,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000011_007.png,Infiltration,7,11,75,M,PA,2782,2753,0.14300000000000002,0.14300000000000002
00000011_008.png,No Finding,8,11,75,M,PA,2826,2685,0.14300000000000002,0.14300000000000002
00000012_000.png,Effusion|Mass,0,12,76,M,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000013_022.png,Infiltration|Mass,0,13,56,M,PA,2870,2991,0.14300000000000002,0.14300000000000002
00000013_023.png,Infiltration|Mass|Pneumothorax,1,13,56,M,AP,2500,2048,0.168,0.168
00000013_024.png,Mass,2,13,56,M,AP,2500,2048,0.168,0.168
00000013_025.png,Cardiomegaly|Infiltration|Mass|Nodule,3,13,56,M,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000013_026.png,Cardiomegaly|Emphysema,4,13,56,M,AP,2500,2048,0.168,0.168
00000013_027.png,Cardiomegaly|Effusion|Emphysema|Mass,5,13,56,M,AP,2500,2048,0.168,0.168
00000013_028.png,Cardiomegaly|Effusion|Emphysema|Mass,6,13,56,M,AP,2500,2048,0.168,0.168
00000013_029.png,Cardiomegaly|Effusion|Emphysema|Mass,7,13,56,M,AP,2500,2048,0.168,0.168
00000013_030.png,Atelectasis|Cardiomegaly|Emphysema|Mass|Pneumothorax,8,13,56,M,AP,2500,2048,0.168,0.168
00000013_031.png,Emphysema|Mass,9,13,56,M,AP,2500,2048,0.168,0.168
00000013_032.png,Emphysema|Mass|Pneumothorax,10,13,56,M,AP,2500,2048,0.168,0.168
00000013_033.png,Pneumothorax,11,13,56,M,PA,2946,2991,0.14300000000000002,0.14300000000000002
00000013_034.png,Emphysema|Pneumothorax,12,13,56,M,PA,2642,2991,0.14300000000000002,0.14300000000000002
00000013_035.png,Atelectasis|Pneumothorax,13,13,56,M,PA,2992,2991,0.14300000000000002,0.14300000000000002
00000013_036.png,Pneumothorax,14,13,56,M,PA,2952,2968,0.14300000000000002,0.14300000000000002`;
}