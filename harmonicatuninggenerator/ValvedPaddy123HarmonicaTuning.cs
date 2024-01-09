namespace Namespace;
public class ValvedPaddy123HarmonicaTuning : TenHoleHarmonica
{

    public ValvedPaddy123HarmonicaTuning()
    {
        TuningName = "ValvedPaddy123Tuned";

        HalfStepBlowBend = new List<string>
        {
            "B3", //1
            "D4s", //2
            "G4s", //3
            "B4", //4
            "D5s", //5
            "G5s", //6
            "B5", //7
            "D6s", //8
            "G6s", //9
            "B6", //10
        };

        BlowReed = new List<string>
        {
            "C4", //1
            "E4", //2
            "A4", //3
            "C5", //1
            "E5", //2
            "A5", //3
            "C6", //1
            "E6", //2
            "A6", //3
            "C7" //10
        };

        DrawReed = new List<string>
        {
            "D4", //1
            "G4", //2
            "B4", //3
            "D5", //1
            "G5", //2
            "B5", //3
            "D6", //1
            "G6", //2
            "B6", //3
            "D7" //10
        };

        HalfStepDrawBend = new List<string>
        {
            "C4s", //1
            "F4s", //2
            "A4s", //3
            "C5s", //1
            "F5s", //2
            "A5s", //3
            "C6s", //1
            "F6s", //2
            "A6s", //3
            "C7s" //10
        };

        WholeStepDrawBend = new List<string>()
        {
            "", //1
            "F4", //2
            "", //3
            "", //1
            "F5", //2
            "", //3
            "", //1
            "F6", //2
            "", //3
            "" //10
        };

    }
}
