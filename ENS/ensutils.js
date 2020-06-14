function namehash(name) {
    var node =
'0x0000000000000000000000000000000000000000000000000000000000000000';                                          
 //1 Node corresponding to empty label ' '

    if (name !== '') {
//2 Splits the full domain name into its constituent labels

        var labels = name.split(".");                      
        for(var i = labels.length - 1; i >= 0; i--) {
//3 Gets current label

            label = labels[i];        
//4 Calculates label hash

            labelHash = web3.sha3(label);                  
            node = web3.sha3(node + labelHash.slice(2), 
//5 Concatenates previous node with current label hash (removes '0x' from label hash) and calculates current node using hex encoding

            {encoding: 'hex'});                            
        }
    }
//6 Returns final node as a string

    return node.toString();                                
}
