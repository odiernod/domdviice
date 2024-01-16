namespace Namespace;
public class ValvedEasyDiatonicHarmonicaTuning : TenHoleHarmonica
{

    public ValvedEasyDiatonicHarmonicaTuning()
    {
        TuningName = "ValvedEasyDiatonic";

        HalfStepBlowBend = new List<string>
        {
            "G3s",
            "B3", //1
            "D4s", //2
            "G4s", //3
            "B4", //4
            "D5s", //5
            "G5s", //6
            "B5", //7
            "D6s", //8
            "G6s", //9
        };

        BlowReed = new List<string>
        {
            "A3",
            "C4", //1
            "E4", //2
            "A4", //3
            "C5", //1
            "E5", //2
            "A5", //3
            "C6", //1
            "E6", //2
            "A6"
        };

        DrawReed = new List<string>
        {
            "B3",
            "D4", //1
            "G4", //2
            "B4", //3
            "D5", //1
            "G5", //2
            "B5", //3
            "D6", //1
            "G6", //2
            "B6"
        };

        HalfStepDrawBend = new List<string>
        {
            "A3s",
            "C4s", //1
            "F4s", //2
            "A4s", //3
            "C5s", //1
            "F5s", //2
            "A5s", //3
            "C6s", //1
            "F6s", //2
            "A6s", //3
        };

        WholeStepDrawBend = new List<string>()
        {
            "",
            "", //1
            "F4", //2
            "", //3
            "", //1
            "F5", //2
            "", //3
            "", //1
            "F6", //2
            "", //3
            
        };

    }
}
