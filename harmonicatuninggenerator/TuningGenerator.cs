using System.CodeDom.Compiler;
using System.Runtime.Serialization;

namespace Namespace;
public class TuningGenerator
{

    private NoteList noteList = new NoteList();
    public void Generate(string tuningName, string templateInC)
    {
        //From C going higher
        //Db
        string templateDb = transpose(templateInC, from:noteList.C5, to:noteList.D5b);
        //generate D

        //Generate LowD -one octave lower
        //Eb
        //generate E

        //Generate LowE --one octave lower

        //F
        //LowF - one octave lower

        //From C going lower

        //B

        //Bb

        //A

        //Ab

        //G

        //HighG - one octave higher

        //Gb

    }

    private string transpose(string template, Note from, Note to)
    {
        var transposeDistance = noteList.GetSemitoneDistance(from, to);

        return template;
    }
    
}
