using System.Reflection.Metadata.Ecma335;

namespace Namespace;

public class Note
{
    public Note(int absolutesemitoneindex)
    {
        NoteName = string.Empty;
        AbsoluteSemitoneIndex = absolutesemitoneindex;
    }
    public string NoteName {get; set;}

    public string NoteClass {
        get {
            if (NoteName.Length != 1) return NoteName.First().ToString() + "s";
            return NoteName.First().ToString();
        }
    }

    public float Frequency {get; set;}

    public int AbsoluteSemitoneIndex {get; private set;}
}

public class NoteList
{
  	public Note C1 = new Note(0){NoteName = "C1"};
	public Note C1s = new Note(0){NoteName = "C1s"};
	public Note D1b;
	public Note D1 = new Note(0){NoteName = "D1"};
	public Note D1s = new Note(0){NoteName = "D1s"};
	public Note E1b;
	public Note E1 = new Note(0){NoteName = "E1"};
	public Note F1 = new Note(0){NoteName = "F1"};
	public Note F1s = new Note(0){NoteName = "F1s"};
	public Note G1b;
	public Note G1 = new Note(0){NoteName = "G1"};
	public Note G1s = new Note(0){NoteName = "G1s"};
	public Note A1b;
	public Note A1 = new Note(0){NoteName = "A1"};
	public Note A1s = new Note(0){NoteName = "A1s"};
	public Note B1b;
	public Note B1 = new Note(0){NoteName = "B1"};
	public Note C2 = new Note(0){NoteName = "C2"};
	public Note C2s = new Note(0){NoteName = "C2s"};
	public Note D2b;
	public Note D2 = new Note(0){NoteName = "D2"};
	public Note D2s = new Note(0){NoteName = "D2s"};
	public Note E2b;
	public Note E2 = new Note(0){NoteName = "E2"};
	public Note F2 = new Note(0){NoteName = "F2"};
	public Note F2s = new Note(0){NoteName = "F2s"};
	public Note G2b;
	public Note G2 = new Note(0){NoteName = "G2"};
	public Note G2s = new Note(0){NoteName = "G2s"};
	public Note A2b;
	public Note A2 = new Note(0){NoteName = "A2"};
	public Note A2s = new Note(0){NoteName = "A2s"};
	public Note B2b;
	public Note B2 = new Note(0){NoteName = "B2"};
	public Note C3 = new Note(0){NoteName = "C3"};
	public Note C3s = new Note(0){NoteName = "C3s"};
	public Note D3b;
	public Note D3 = new Note(0){NoteName = "D3"};
	public Note D3s = new Note(0){NoteName = "D3s"};
	public Note E3b;
	public Note E3 = new Note(0){NoteName = "E3"};
	public Note F3 = new Note(0){NoteName = "F3"};
	public Note F3s = new Note(0){NoteName = "F3s"};
	public Note G3b;
	public Note G3 = new Note(0){NoteName = "G3"};
	public Note G3s = new Note(0){NoteName = "G3s"};
	public Note A3b;
	public Note A3 = new Note(0){NoteName = "A3"};
	public Note A3s = new Note(0){NoteName = "A3s"};
	public Note B3b;
	public Note B3 = new Note(0){NoteName = "B3"};
	public Note C4 = new Note(0){NoteName = "C4"};
	public Note C4s = new Note(0){NoteName = "C4s"};
	public Note D4b;
	public Note D4 = new Note(0){NoteName = "D4"};
	public Note D4s = new Note(0){NoteName = "D4s"};
	public Note E4b;
	public Note E4 = new Note(0){NoteName = "E4"};
	public Note F4 = new Note(0){NoteName = "F4"};
	public Note F4s = new Note(0){NoteName = "F4s"};
	public Note G4b;
	public Note G4 = new Note(0){NoteName = "G4"};
	public Note G4s = new Note(0){NoteName = "G4s"};
	public Note A4b;
	public Note A4 = new Note(0){NoteName = "A4"};
	public Note A4s = new Note(0){NoteName = "A4s"};
	public Note B4b;
	public Note B4 = new Note(0){NoteName = "B4"};
	public Note C5 = new Note(0){NoteName = "C5"};
	public Note C5s = new Note(0){NoteName = "C5s"};
	public Note D5b;
	public Note D5 = new Note(0){NoteName = "D5"};
	public Note D5s = new Note(0){NoteName = "D5s"};
	public Note E5b;
	public Note E5 = new Note(0){NoteName = "E5"};
	public Note F5 = new Note(0){NoteName = "F5"};
	public Note F5s = new Note(0){NoteName = "F5s"};
	public Note G5b;
	public Note G5 = new Note(0){NoteName = "G5"};
	public Note G5s = new Note(0){NoteName = "G5s"};
	public Note A5b;
	public Note A5 = new Note(0){NoteName = "A5"};
	public Note A5s = new Note(0){NoteName = "A5s"};
	public Note B5b;
	public Note B5 = new Note(0){NoteName = "B5"};
	public Note C6 = new Note(0){NoteName = "C6"};
	public Note C6s = new Note(0){NoteName = "C6s"};
	public Note D6b;
	public Note D6 = new Note(0){NoteName = "D6"};
	public Note D6s = new Note(0){NoteName = "D6s"};
	public Note E6b;
	public Note E6 = new Note(0){NoteName = "E6"};
	public Note F6 = new Note(0){NoteName = "F6"};
	public Note F6s = new Note(0){NoteName = "F6s"};
	public Note G6b;
	public Note G6 = new Note(0){NoteName = "G6"};
	public Note G6s = new Note(0){NoteName = "G6s"};
	public Note A6b;
	public Note A6 = new Note(0){NoteName = "A6"};
	public Note A6s = new Note(0){NoteName = "A6s"};
	public Note B6b;
	public Note B6 = new Note(0){NoteName = "B6"};
	public Note C7 = new Note(0){NoteName = "C7"};
	public Note C7s = new Note(0){NoteName = "C7s"};
	public Note D7b;
	public Note D7 = new Note(0){NoteName = "D7"};
	public Note D7s = new Note(0){NoteName = "D7s"};
	public Note E7b;
	public Note E7 = new Note(0){NoteName = "E7"};
	public Note F7 = new Note(0){NoteName = "F7"};
	public Note F7s = new Note(0){NoteName = "F7s"};
	public Note G7b;
	public Note G7 = new Note(0){NoteName = "G7"};
	public Note G7s = new Note(0){NoteName = "G7s"};
	public Note A7b;
	public Note A7 = new Note(0){NoteName = "A7"};
	public Note A7s = new Note(0){NoteName = "A7s"};
	public Note B7b;
	public Note B7 = new Note(0){NoteName = "B7"};

    private List<Note> orderedNotes;

    public NoteList()
    {
	D1b = C1s;
	E1b = D1s;
	G1b = F1s;
	A1b = G1s;
	B1b = A1s;
	D2b = C2s;
	E2b = D2s;
	G2b = F2s;
	A2b = G2s;
	B2b = A2s;
	D3b = C3s;
	E3b = D3s;
	G3b = F3s;
	A3b = G3s;
	B3b = A3s;
	D4b = C4s;
	E4b = D4s;
	G4b = F4s;
	A4b = G4s;
	B4b = A4s;
	D5b = C5s;
	E5b = D5s;
	G5b = F5s;
	A5b = G5s;
	B5b = A5s;
	D6b = C6s;
	E6b = D6s;
	G6b = F6s;
	A6b = G6s;
	B6b = A6s;
	D7b = C7s;
	E7b = D7s;
	G7b = F7s;
	A7b = G7s;
	B7b = A7s;

    orderedNotes = new List<Note>();
    
	orderedNotes.Add(C1 );
	orderedNotes.Add(C1s);
	orderedNotes.Add(D1 );
	orderedNotes.Add(D1s);
	orderedNotes.Add(E1 );
	orderedNotes.Add(F1 );
	orderedNotes.Add(F1s);
	orderedNotes.Add(G1 );
	orderedNotes.Add(G1s);
	orderedNotes.Add(A1 );
	orderedNotes.Add(A1s);
	orderedNotes.Add(B1 );
	orderedNotes.Add(C2 );
	orderedNotes.Add(C2s);
	orderedNotes.Add(D2 );
	orderedNotes.Add(D2s);
	orderedNotes.Add(E2 );
	orderedNotes.Add(F2 );
	orderedNotes.Add(F2s);
	orderedNotes.Add(G2 );
	orderedNotes.Add(G2s);
	orderedNotes.Add(A2 );
	orderedNotes.Add(A2s);
	orderedNotes.Add(B2 );
	orderedNotes.Add(C3 );
	orderedNotes.Add(C3s);
	orderedNotes.Add(D3 );
	orderedNotes.Add(D3s);
	orderedNotes.Add(E3 );
	orderedNotes.Add(F3 );
	orderedNotes.Add(F3s);
	orderedNotes.Add(G3 );
	orderedNotes.Add(G3s);
	orderedNotes.Add(A3 );
	orderedNotes.Add(A3s);
	orderedNotes.Add(B3 );
	orderedNotes.Add(C4 );
	orderedNotes.Add(C4s);
	orderedNotes.Add(D4 );
	orderedNotes.Add(D4s);
	orderedNotes.Add(E4 );
	orderedNotes.Add(F4 );
	orderedNotes.Add(F4s);
	orderedNotes.Add(G4 );
	orderedNotes.Add(G4s);
	orderedNotes.Add(A4 );
	orderedNotes.Add(A4s);
	orderedNotes.Add(B4 );
	orderedNotes.Add(C5 );
	orderedNotes.Add(C5s);
	orderedNotes.Add(D5 );
	orderedNotes.Add(D5s);
	orderedNotes.Add(E5 );
	orderedNotes.Add(F5 );
	orderedNotes.Add(F5s);
	orderedNotes.Add(G5 );
	orderedNotes.Add(G5s);
	orderedNotes.Add(A5 );
	orderedNotes.Add(A5s);
	orderedNotes.Add(B5 );
	orderedNotes.Add(C6 );
	orderedNotes.Add(C6s);
	orderedNotes.Add(D6 );
	orderedNotes.Add(D6s);
	orderedNotes.Add(E6 );
	orderedNotes.Add(F6 );
	orderedNotes.Add(F6s);
	orderedNotes.Add(G6 );
	orderedNotes.Add(G6s);
	orderedNotes.Add(A6 );
	orderedNotes.Add(A6s);
	orderedNotes.Add(B6 );
	orderedNotes.Add(C7 );
	orderedNotes.Add(C7s);
	orderedNotes.Add(D7 );
	orderedNotes.Add(D7s);
	orderedNotes.Add(E7 );
	orderedNotes.Add(F7 );
	orderedNotes.Add(F7s);
	orderedNotes.Add(G7 );
	orderedNotes.Add(G7s);
	orderedNotes.Add(A7 );
	orderedNotes.Add(A7s);
	orderedNotes.Add(B7 );
    }

    public int GetSemitoneDistance(Note fromNote, Note toNote)
    {
        var fromNoteIndex = orderedNotes.FindIndex(note => note == fromNote);
        var toNoteIndex = orderedNotes.FindIndex(note=> note == toNote);
        return toNoteIndex - fromNoteIndex;
    }

    public Note GetNote(Note startingNote, int semitoneDistance)
    {

        var startingNoteIndex = orderedNotes.FindIndex(note => note == startingNote);

        var endingNote = orderedNotes[startingNoteIndex + semitoneDistance];

        return endingNote;

    }    
    

}
