class HuffmanNode {
    constructor(character, frequency, leftChild = null, rightChild = null) {
      this.character = character;
      this.frequency = frequency;
      this.leftChild = leftChild;
      this.rightChild = rightChild;
    }
  
    isLeaf() {
      return !this.leftChild && !this.rightChild;
    }
  }
  
  function buildFrequencyTable(string) {
    const frequencyTable = {};
  
    for (let i = 0; i < string.length; i++) {
      const character = string[i];
  
      if (frequencyTable[character]) {
        frequencyTable[character]++;
      } else {
        frequencyTable[character] = 1;
      }
    }
  
    return frequencyTable;
  }
  
  function buildHuffmanTree(frequencyTable) {
    const priorityQueue = [];
  
    for (const character in frequencyTable) {
      const frequency = frequencyTable[character];
      const node = new HuffmanNode(character, frequency);
      priorityQueue.push(node);
    }
  
    while (priorityQueue.length > 1) {
      priorityQueue.sort((a, b) => a.frequency - b.frequency);
      const leftChild = priorityQueue.shift();
      const rightChild = priorityQueue.shift();
      const parent = new HuffmanNode('', leftChild.frequency + rightChild.frequency, leftChild, rightChild);
      priorityQueue.push(parent);
    }
  
    return priorityQueue[0];
  }
  
  function buildEncodingTable(node, prefix = '') {
    const encodingTable = {};
  
    if (node.isLeaf()) {
      encodingTable[node.character] = prefix;
    } else {
      const leftEncodingTable = buildEncodingTable(node.leftChild, prefix + '0');
      const rightEncodingTable = buildEncodingTable(node.rightChild, prefix + '1');
      Object.assign(encodingTable, leftEncodingTable, rightEncodingTable);
    }
  
    return encodingTable;
  }
  
  function encode(string) {
    const frequencyTable = buildFrequencyTable(string);
    const huffmanTree = buildHuffmanTree(frequencyTable);
    const encodingTable = buildEncodingTable(huffmanTree);
    let encodedString = '';
  
    for (let i = 0; i < string.length; i++) {
      const character = string[i];
      encodedString += encodingTable[character];
    }
  
    return encodedString;
  }
  
  function decode(encodedString, huffmanTree) {
    let decodedString = '';
    let currentNode = huffmanTree;
  
    for (let i = 0; i < encodedString.length; i++) {
      const bit = encodedString[i];
  
      if (bit === '0') {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
  
      if (currentNode.isLeaf()) {
        decodedString += currentNode.character;
        currentNode = huffmanTree;
      }
    }
  
    return decodedString;
  }
  var imgdatauri;

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        imgdatauri = e.target.result;
      };
    }
    reader.readAsDataURL(input.files[0]);
  }
  function hidetext(){
    var text = document.getElementById("data-box").value;
    alert(text);
    console.log(steg.encode(text, imgdatauri));
  }
  
  // decodeButton.addEventListener('click', () => {
  //   const encodedString = encoded.textContent;
  //   const huffmanTree = buildHuffmanTree(buildFrequencyTable(input.value));
  //   const decodedString = decode(encodedString, huffmanTree);
  //   decoded.textContent = decodedString;
  // });