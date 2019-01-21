'use strict';function parse(value){var op=value.replace(/\./g,'').replace(/[^=<>.]/g,'');var v=value.replace(/[=<>]/g,'');var tokens=v.split('.').map(function(v){return Number.parseInt(v);});if(tokens.length<3){for(var i=tokens.length;i<3;i++){tokens.push(0);}}return{op:!!op?op:null,tokens:tokens};}function compare(){var a=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var b=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;if(a===b){return 0;}else if(a<b){return 1;}else{return-1;}}function zip(as,bs){return as.map(function(e,i){return[e,bs[i]];});}function compareVersion(a,b){try{var as=parse(a);var bs=parse(b);var comparedPairs=zip(as.tokens,bs.tokens).map(function(pair){return compare(pair[0],pair[1]);});return verify(comparedPairs);}catch(e){return 0;}}function verify(pairs,op){var reduced=pairs.reduce(function(acc,curr){return acc!==0?acc:curr;},0);if(op==='>='){return reduced<=0;}else if(op==='>'){return reduced<0;}else if(op==='<='){return reduced>=0;}else if(op==='<'){return reduced>0;}else{return reduced===0;}}function matchVersion(a,b){try{var as=parse(a);var bs=parse(b);var comparedPairs=zip(as.tokens,bs.tokens).map(function(pair){return compare(pair[0],pair[1]);});return verify(comparedPairs,bs.op);}catch(e){return false;}}if(!!exports){exports.matchVersion=matchVersion;}