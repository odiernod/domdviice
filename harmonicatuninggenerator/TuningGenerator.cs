using System.CodeDom.Compiler;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.Serialization;

namespace Namespace;
public class TuningGenerator
{

    private NoteList noteList = new NoteList();
    public void Generate(TenHoleHarmonica templateInC)
    {
        //From C going higher
        //Db
        var tuningName = templateInC.TuningName.ToLower();
        var tDb = transpose(templateInC, from:noteList.C5, to:noteList.D5b);
        
        //generate D
        var tD = transpose(templateInC, from:noteList.C5, to:noteList.D5);

        //Generate LowD -one octave lower
        var tLowD = transpose(tD, from:noteList.D5, to:noteList.D4);
        //Eb
        var tEb = transpose(templateInC, from:noteList.C5, to:noteList.E5b);
        //generate E
        var tE = transpose(templateInC, from:noteList.C5, to:noteList.E5);

        //Generate LowE --one octave lower
        var tLowE = transpose(tE, from:noteList.E5, to:noteList.E4);

        //F
        var tF = transpose(templateInC, from:noteList.C5, to:noteList.F5);

        //LowF - one octave lower
        var tLowF = transpose(tF, from:noteList.F5, to:noteList.F4);

        //From C going lower
        //B
        var tB = transpose(templateInC, from:noteList.C5, to:noteList.B4);

        //Bb
        var tBb = transpose(templateInC, from:noteList.C5, to:noteList.B4b);

        //A
        var tA = transpose(templateInC, from:noteList.C5, to:noteList.A4);

        //Ab
        var tAb = transpose(templateInC, from:noteList.C5, to:noteList.A4b);

        //G
        var tG = transpose(templateInC, from:noteList.C5, to:noteList.G4);

        //HighG - one octave higher
        var thighG = transpose(templateInC, from:noteList.C5, to:noteList.G5);

        //Gb
        var tGb = transpose(templateInC, from:noteList.C5, to:noteList.G4b);

        var lines = new List<string>
        {
            tuningName + "c:",
            templateInC.ToHtml(),
            tuningName + "db:",
            tDb.ToHtml(),
            tuningName + "d:",
            tD.ToHtml(),
            tuningName + "lowd:",
            tLowD.ToHtml(),
            tuningName + "eb:",
            tEb.ToHtml(),
            tuningName + "e:",
            tE.ToHtml(),
            tuningName + "lowe:",
            tLowE.ToHtml(),
            tuningName + "f:",
            tF.ToHtml(),
            tuningName + "lowf:",
            tLowF.ToHtml(),
            tuningName + "gb:",
            tGb.ToHtml(),
            tuningName + "g:",
            tG.ToHtml(),
            tuningName + "highg:",
            thighG.ToHtml(),
            tuningName + "ab:",
            tAb.ToHtml(),
            tuningName + "a:",
            tA.ToHtml(),
            tuningName + "bb:",
            tBb.ToHtml(),
            tuningName + "b:",
            tB.ToHtml()
        };

        File.AppendAllLines(tuningName + ".txt", lines);
    }


    private TenHoleHarmonica transpose(TenHoleHarmonica template, Note from, Note to)
    {
        if (template == null) return null;

        var transposeDistance = noteList.GetSemitoneDistance(from, to);

        var transposedHarmonica = new TenHoleHarmonica
        {
            TuningName = (template.TuningName + to.NoteName.First().ToString()).ToLower(),
            WholeStepBlowBend = transposeNotes(template.WholeStepBlowBend, transposeDistance),
            HalfStepBlowBend = transposeNotes(template.HalfStepBlowBend, transposeDistance),
            BlowReed = transposeNotes(template.BlowReed, transposeDistance),
            DrawReed = transposeNotes(template.DrawReed, transposeDistance),
            HalfStepDrawBend = transposeNotes(template.HalfStepDrawBend, transposeDistance),
            WholeStepDrawBend = transposeNotes(template.WholeStepDrawBend, transposeDistance),
            ThreeSemitoneDrawBend = transposeNotes(template.ThreeSemitoneDrawBend, transposeDistance)
        };

        return transposedHarmonica;
    }

    private List<string> transposeNotes(List<string> notes, int semitoneDistance)
    {
        if (notes == null) return null;

        var transposedNotes = new List<string>();

        foreach (var note in notes)
        {
            if (note == string.Empty)
            {
                transposedNotes.Add(string.Empty);
            }
            else
            {
                var transposedNote = noteList.GetNote(note, semitoneDistance);
                transposedNotes.Add(transposedNote.NoteName);
            }
        }

        return transposedNotes;
    }
    
}
