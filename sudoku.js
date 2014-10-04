var grid;
var result;
var initialValue = [{ "x": 0, "y": 0, "value": 5 },
                    { "x": 0, "y": 1, "value": 3 },
                    { "x": 0, "y": 4, "value": 7 },
                    { "x": 1, "y": 0, "value": 6 },
                    { "x": 1, "y": 3, "value": 1 },
                    { "x": 1, "y": 4, "value": 9 },
                    { "x": 1, "y": 5, "value": 5 },
                    { "x": 2, "y": 1, "value": 9 },
                    { "x": 2, "y": 2, "value": 8 },
                    { "x": 2, "y": 7, "value": 6 },
                    { "x": 3, "y": 0, "value": 8 },
                    { "x": 3, "y": 4, "value": 6 },
                    { "x": 3, "y": 8, "value": 3 },
                    { "x": 4, "y": 0, "value": 4 },
                    { "x": 4, "y": 3, "value": 8 },
                    { "x": 4, "y": 5, "value": 3 },
                    { "x": 4, "y": 8, "value": 1 },
                    { "x": 5, "y": 0, "value": 7 },
                    { "x": 5, "y": 4, "value": 2 },
                    { "x": 5, "y": 8, "value": 6 },
                    { "x": 6, "y": 1, "value": 6 },
                    { "x": 6, "y": 6, "value": 2 },
                    { "x": 6, "y": 7, "value": 8 },
                    { "x": 7, "y": 3, "value": 4 },
                    { "x": 7, "y": 4, "value": 1 },
                    { "x": 7, "y": 5, "value": 9 },
                    { "x": 7, "y": 8, "value": 5 },
                    { "x": 8, "y": 4, "value": 8 },
                    { "x": 8, "y": 7, "value": 7 },
                    { "x": 8, "y": 8, "value": 9 }
];

function Init() {
    InitGrid();
    InitUI();

}

function InitGrid() {
    grid = new Array(9);
    for (var i = 0; i < 9; i++) {
        grid[i] = new Array(9);
    }
    result = new Array(3);
    for (var i = 0 ; i < 3; i++) {
        result[i] = new Array(9);
    }
    InitData();
    $('#clearbutton').click(ButtonClicked)
}

function ButtonClicked() {
    InitData();
    InitUI();
}

function InitData() {
    for (var i = 0 ; i < 3; i++)
        for (var j = 0 ; j < 9; j++)
            result[i][j] = false;
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++)
            grid[i][j] = 0;

    for (var i = 0; i < initialValue.length; i++) {
        grid[initialValue[i].x][initialValue[i].y] = initialValue[i].value;
    }
}

function InitUI() {
    ClearError();
    var tb = "<colgroup>";
    for (var i = 0; i < 9; i++) {
        tb += '<col>';
    }
    tb += "</colgroup>";

    for (var i = 0; i < 9; i++) {
        var tr = '<tr>';
        for (var j = 0; j < 9; j++) {
            var td = '<td>';
            var id = 'i' + i + j;
            var inputBox;
            if (grid[i][j])
                inputBox = '<input type="text" id=' + id + ' value=' + grid[i][j] + ' readonly=' + '"readonly"/>';
            else
                inputBox = '<input type="text" id=' + id + ' onchange="Update(this)"/>';
            td += inputBox + '</td>';
            tr += td;
        }
        tr += '</tr>';
        tb += tr;
    }
    $('#sodokutable').children().remove();
    $('#sodokutable').append(tb);
}

function Update(obj) {
    var id = $(obj).attr("id");
    ClearError();
    if ($(obj).val() == "")
        grid[id[1]][id[2]] = 0;
    else
        if (($(obj).val() >= 1) && ($(obj).val() <= 9)) {
            grid[id[1]][id[2]] = $(obj).val();
        }
        else {
            PrintError("Enter a number from 1 to 9", 3);
        }
    Check(id[1], id[2]);
}

function Check(m, n) {
    var tb = new Array(9);
    for (var i = 0; i < 9; i++)
        tb[i] = 0;

    for (var i = 0; i < 9; i++) {
        if (grid[m][i])
            tb[grid[m][i]-1]++;
    }
    
    var isValid = true;
    var isDone = true;
    for (var i = 0; i < 9; i++) {
        if (tb[i] > 1) {
            isValid = false;
        }
        if (tb[i] == 0) {
            isDone = false;
        }
        tb[i] = 0;
    }

    result[0][m] = isDone;
    if (isValid==false) {
        PrintError(m, 0);
        return;
    }

    for (var i = 0; i < 9; i++) {
        if (grid[i][n])
            tb[grid[i][n]-1]++;
    }

    isValid = true;
    isDone = true;
    for (var i = 0; i < 9; i++) {
        if (tb[i] > 1) {
            isValid = false;
        }
        if (tb[i] == 0) {
            isDone = false;
        }
        tb[i] = 0;
    }

    result[1][n] = isDone;
    if (isValid==false) {
        PrintError(n, 1);
        return;
    }

    var rowstart = Math.floor(m / 3) * 3;
    var colstart = Math.floor(n / 3) * 3;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (grid[rowstart + i][colstart + j])
                tb[grid[rowstart + i][colstart + j]-1]++;
        }
    }

    isValid = true;
    isDone = true;
    var number = Math.floor(n / 3) * 3 + Math.floor(m / 3);
    for (var i = 0; i < 9; i++) {
        if (tb[i] > 1) {
            isValid = false;
        }
        if (tb[i] == 0) {
            isDone = false;
        }
        tb[i] = 0;
    }

    result[2][number] = isDone;
    if (isValid == false) {
        PrintError(number, 2);
        return;
    }

    CheckResult();
}

function CheckResult() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
            if (result[i][j] == false)
                return;
        }
    }
    PrintError("Successfull!", 3);
}

function ClearError() {
    $('#error').html("");
}

function PrintError(num, type) {
    if (type == 0) {
        $('#error').html("row #" + num + " has error");
    }
    if (type == 1) {
        $('#error').html("column #" + num + " has error");
    }
    if (type == 2) {
        $('#error').html("block #" + num + " has error");
    }
    if (type == 3) {
        $('#error').html(num);
    }

}
