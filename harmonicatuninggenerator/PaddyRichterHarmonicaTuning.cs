namespace Namespace;
public class PaddyRichterHarmonicaTuning : TenHoleHarmonica
{

    public PaddyRichterHarmonicaTuning()
    {
        TuningName = "PaddyRichterTuned";

        WholeStepBlowBend = new List<string>
        {
            "", //1
            "", //2
            "", //3
            "", //4
            "", //5
            "", //6
            "", //7
            "", //8
            "", //9
            "A6s" //10
        }
        
        HalfStepBlowBend = new List<string>
        {
            "D4s", //1
            "G4s", //2
            "C5", //3
            "D5s", //4
            "F5s", //5
            "A5s", //6
            "", //7
            "D6s", //8
            "F6s", //9
            "B6" //10
        };

        BlowReed = new List<string>
        {
            "C4", //1
            "E4", //2
            "A4", //3
            "C5", //4
            "E5", //5
            "G5", //6
            "C6", //7
            "E6", //8
            "G6", //9
            "C7" //10
        };

        DrawReed = new List<string>
        {
            "D4", //1
            "G4", //2
            "B4", //3
            "D5", //4
            "F5", //5
            "A5", //6
            "B5", //7
            "D6", //8
            "F6", //9
            "A6" //10
        };

        HalfStepDrawBend = new List<string>
        {
            "C4s", //1
            "F4s", //2
            "A4s", //3
            "C5s", //4
            "", //5
            "G5s", //6
            "C6s", //7
            "F6", //8
            "G6s", //9
            "C7s" //10
        };

        WholeStepDrawBend = new List<string>()
        {
            "", //1
            "F4", //2
            "", //3
            "", //4
            "", //5
            "", //6
            "", //7
            "", //8
            "", //9
            "" //10
        };  

    }
}
