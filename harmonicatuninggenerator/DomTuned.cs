namespace Namespace;
public class DomTuning : TenHoleHarmonica
{

    public DomTuning()
    {
        TuningName = "domtuned";

        HalfStepBlowBend = new List<string>
        {
            "A3s", //1
            "D4s", //2
            "F4s", //3
            "A4s", //4
            "C5s", //5
            "D5s", //6
            "F5s", //7
            "A5s", //8
            "D6s", //9
            "G6s" //10
        };

        BlowReed = new List<string>
        {
            "B3", //1
            "E4", //2
            "G4", //3
            "B4", //4
            "D5", //5
            "E5", //6
            "G5", //7
            "B5", //8
            "E6", //9
            "A6" //10
        };

        DrawReed = new List<string>
        {
            "D4", //1
            "G4", //2
            "A4s", //3
            "D5", //4
            "F5", //5
            "G5", //6
            "A5s", //7
            "D6", //8
            "G6", //9
            "C7" //10
        };

        HalfStepDrawBend = new List<string>
        {
            "C4s", //1
            "F4s", //2
            "A4", //3
            "C5s", //4
            "E5", //5
            "F5s", //6
            "A5", //7
            "C6s", //8
            "F6s", //9
            "B6" //10
        };

        WholeStepDrawBend = new List<string>()
        {
            "C4", //1
            "F4", //2
            "G4s", //3
            "C5", //4
            "D5s", //5
            "F5", //6
            "G5s", //7
            "C6", //8
            "F6", //9
            "A6s" //10
        };

    }
}
