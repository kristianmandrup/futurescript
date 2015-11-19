import * as $lex from "../lib/c-lex-0.js";
import assert from "assert";

let s = null;

s = new $lex.Lex(`lemo 0.1.0
x: "abc"
x: "
    abc
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineNormalString, CallLeftParenthesis, Str "abc", RightParenthesis, Semicolon, NormalToken "x", Colon, FormattedNormalString, CallLeftParenthesis, Str "abc", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
x: "abc \\n\\" def"
x: "
    abc \\n\\" def
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineNormalString, CallLeftParenthesis, Str "abc \\\\n\\\\\\" def", RightParenthesis, Semicolon, NormalToken "x", Colon, FormattedNormalString, CallLeftParenthesis, Str "abc \\\\n\\\\\\" def", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
x: "abc \\(def) ghi"
x: "
    abc \\(def) ghi
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineNormalString, CallLeftParenthesis, Str "abc ", Plus, NormalLeftParenthesis, NormalToken "def", RightParenthesis, Plus, Str " ghi", RightParenthesis, Semicolon, NormalToken "x", Colon, FormattedNormalString, CallLeftParenthesis, Str "abc ", Plus, NormalLeftParenthesis, NormalToken "def", RightParenthesis, Plus, Str " ghi", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
--
    "abc \\
            def"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", DashFunction, LeftChevron, InlineNormalString, CallLeftParenthesis, Str "abc         def", RightParenthesis, RightChevron');

s = new $lex.Lex(`lemo 0.1.0
x: "
        aaa
            bbb
            ccc
    ddd
        eee
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, FormattedNormalString, CallLeftParenthesis, Str "    aaa\\\\n        bbb\\\\n        ccc\\\\nddd\\\\n    eee", RightParenthesis');

// Each last line of the first 5 strings should be treated as empty. But the last line of the 6th string should be treated as not empty. These 6 strings only have differences (of the number of spaces) in their last lines.
s = new $lex.Lex(`lemo 0.1.0
--
    "
        abc
            def

    "

    "
        abc
            def
 
    "

    "
        abc
            def
    
    "

    "
        abc
            def
     
    "

    "
        abc
            def
        
    "

    "
        abc
            def
            
    "
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", DashFunction, LeftChevron, FormattedNormalString, CallLeftParenthesis, Str "abc\\\\n    def\\\\n", RightParenthesis, Semicolon, FormattedNormalString, CallLeftParenthesis, Str "abc\\\\n    def\\\\n", RightParenthesis, Semicolon, FormattedNormalString, CallLeftParenthesis, Str "abc\\\\n    def\\\\n", RightParenthesis, Semicolon, FormattedNormalString, CallLeftParenthesis, Str "abc\\\\n    def\\\\n", RightParenthesis, Semicolon, FormattedNormalString, CallLeftParenthesis, Str "abc\\\\n    def\\\\n", RightParenthesis, Semicolon, FormattedNormalString, CallLeftParenthesis, Str "abc\\\\n    def\\\\n    ", RightParenthesis, RightChevron');

s = new $lex.Lex(`lemo 0.1.0
x: v"C:\\Windows"
x: v"
    C:\\Windows\\
    aaa \\(bbb)
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineVerbatimString, CallLeftParenthesis, Str "C:\\\\Windows", RightParenthesis, Semicolon, NormalToken "x", Colon, FormattedVerbatimString, CallLeftParenthesis, Str "C:\\\\Windows\\\\\\\\naaa \\\\(bbb)", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
x: "aaaaaaa\\
bbbbbbb"
x: "
    a
    b\\
    c
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineNormalString, CallLeftParenthesis, Str "aaaaaaabbbbbbb", RightParenthesis, Semicolon, NormalToken "x", Colon, FormattedNormalString, CallLeftParenthesis, Str "a\\\\nbc", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
x: r"hello \\(\\\"world\\\"\\)#(a.b() + c)"
x: r"
    hello \\x20
    world #(a) # a
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineRegex, CallLeftParenthesis, Str "hello \\\\(\\\\\\"world\\\\\\"\\\\)", Plus, NormalLeftParenthesis, NormalToken "a", Dot, NormalToken "b", CallLeftParenthesis, RightParenthesis, Plus, NormalToken "c", RightParenthesis, Plus, Str "", RightParenthesis, Semicolon, NormalToken "x", Colon, FormattedRegex, CallLeftParenthesis, Str "hello \\\\x20\\\\nworld ", Plus, NormalLeftParenthesis, NormalToken "a", RightParenthesis, Plus, Str " # a", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
x: js"var a = 'asdf\\(asdf)';"
x: js"
    var a = "asdf\\(asdf)\\
    ggg";
"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineJs, CallLeftParenthesis, Str "var a = \'asdf\\\\(asdf)\';", RightParenthesis, Semicolon, NormalToken "x", Colon, FormattedJs, CallLeftParenthesis, Str "var a = \\"asdf\\\\(asdf)\\\\\\\\nggg\\";", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
x: "\\(abc)aaa"
x: "aaa\\(abc)"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineNormalString, CallLeftParenthesis, Str "", Plus, NormalLeftParenthesis, NormalToken "abc", RightParenthesis, Plus, Str "aaa", RightParenthesis, Semicolon, NormalToken "x", Colon, InlineNormalString, CallLeftParenthesis, Str "aaa", Plus, NormalLeftParenthesis, NormalToken "abc", RightParenthesis, Plus, Str "", RightParenthesis');

s = new $lex.Lex(`lemo 0.1.0
x: "aaa \\((abc + 1).toString()) bbb"
`).toString();
console.log(s === 'VersionDirective "lemo 0.1.0", NormalToken "x", Colon, InlineNormalString, CallLeftParenthesis, Str "aaa ", Plus, NormalLeftParenthesis, NormalLeftParenthesis, NormalToken "abc", Plus, Num "1", RightParenthesis, Dot, NormalToken "toString", CallLeftParenthesis, RightParenthesis, RightParenthesis, Plus, Str " bbb", RightParenthesis');
