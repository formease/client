(()=>{var r=async e=>{let t=await fetch("/createForm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.status!==200&&(alert("Error Creating a Porject: "+t.status),console.error("Error Creating a Porject: "+t.status))};})();
//# sourceMappingURL=send.js.map
