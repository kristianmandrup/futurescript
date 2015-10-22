import * as $lex from "../lib/compile-lex-0";
import * as $block from "../lib/compile-block-0";
import assert from "assert";

let s = null;
let lex, result;

lex = new $lex.Lex(`lemo 0.1.0, node module
a: 1 + 2 + 3
b: 2 + 3
c: abc(5, 6)
if a
    c: 7
else
    c: 5
d: "xxx"
e: a.b.c
`);
let block = new $block.Block({lex: lex, startIndex: 0, endIndex: lex.count() - 1});
console.log(block);
console.log(block.print());
console.log(block.value[2]);
console.log(block.value[3]);
console.log(block.value[5].value);