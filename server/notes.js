const fs= require('fs');
const fileName='notes.json'
const getNotes = function () {
    return 'Your notes...'
}

const addNotes= function(title, body){
    const notes= loadNotes();
    const duplicateNotes=notes.filter(function(note){
        return note.title===title
    })
    
    console.log('notes', notes);
    if(duplicateNotes.length===0){
        notes.push({
            title:title,
             body: body
            });
    
    }
    
    saveNotes(notes);
    console.log('Note added successfully')

    
}
const saveNotes=function(notes){
const dataJSON= JSON.stringify(notes);
fs.writeFileSync(fileName, dataJSON);
}
const loadNotes=function(){
    try{
        const dataBuffer=fs.readFileSync(fileName)
        const  dataJSON= dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return []
    }

}
const removeNote= function(title){
console.log(title)
const notes= loadNotes();
const notesToKeep=notes.filter(function(note){
 return note.title!==title;
});

console.log(notesToKeep);
saveNotes(notesToKeep);
console.log('Note updated successfully')


}

const listNotes= function(){
    loadNotes().map(function(note){
     console.log(note);
    });
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes
}