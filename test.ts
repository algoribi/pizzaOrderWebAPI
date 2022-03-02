const regexr = /^([가-힣0-9]+)(?:\(\s*([가-힣0-9\s,]+)\s*\))?$/;

["페페로니(치즈)", "불고기", "10001(30001, 30002  , 30003)", "콜라"].forEach(i => {
    const r = regexr.exec(i);
    r && console.log(r);
    r && r["2"] && console.log(r["2"].split(",").map(i => i.trim()));
})