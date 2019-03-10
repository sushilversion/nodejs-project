const fs= require('fs');
const chalk= require('chalk')
const fileName='notes.json'
const getNotes =  ()=> {
    return 'Your notes...'
}

const readNote=(title)=>{
    console.log(chalk.green.inverse('Reading request for : ', title));
    const note= loadNotes().find((note)=>note.title===title);
    if(note==undefined){
    console.log(chalk.red.inverse('No node found'));
        return;
        
    }
    console.log(note);

}


const addNotes= (title, body)=>{
    const notes= loadNotes();
    const duplicateNote=notes.find((note)=>note.title===title);
    
    console.log('notes', notes);
    if(!duplicateNote){
        notes.push({
            title:title,
             body: body
            });
    
    }
    
    saveNotes(notes);
    console.log('Note added successfully')

    
}
const saveNotes=(notes)=>{
const dataJSON= JSON.stringify(notes);
fs.writeFileSync(fileName, dataJSON);
}
const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync(fileName)
        const  dataJSON= dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return []
    }

}
const removeNote= (title)=>{
console.log(title)
const notes= loadNotes();
const notesToKeep=notes.filter((note)=>note.title!==title);

if(notes.length> notesToKeep.length){
    console.log(chalk.green.inverse('Note Removed'));
    saveNotes(notesToKeep);
} else{
    console.log(chalk.red.inverse('No note found!'))
}

}

const listNotes= ()=>{
    console.log(chalk.inverse('Your Notes'))
    loadNotes().map((note)=>console.log(note.title));
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}