namespace Namespace;
public class TestChromatic10Tuning : TenHoleHarmonica
{

    public TestChromatic10Tuning()
    {
        TuningName = "TestChromatic10Tuning"; //Paddy Wilde Chromatic (need a better name)

        HalfStepBlowBend = new List<string>
        {
            "B4", //4
            "D5s", //5
            "D5s", //6
            "G5s", //7
            "B4", //4
            "D5s", //5
            "D5s", //6
            "G5s", //7
            "B4", //4
            "D5s", //5  
        };

        BlowReed = new List<string>
        {
            "C5", //4
            "E5", //5
            "E5", //6
            "A5", //7
            "C5", //4
            "E5", //5
            "E5", //6
            "A5", //7
            "C5", //4
            "E5", //5
        };

        DrawReed = new List<string>
        {
            "D5", //4
            "F5", //5
            "G5", //6
            "B5", //7
            "D5", //4
            "F5", //5
            "G5", //6
            "B5", //7
            "D5", //4
            "F5", //5
        };

        HalfStepDrawBend = new List<string>
        {
           "C5s", //4
            "", //5
            "F5s", //6
            "A5s", //7
            "C5s", //4
            "", //5
            "F5s", //6
            "A5s", //7
            "C5s", //4
            "", //5
        };

        WholeStepDrawBend = new List<string>()
        {
           "", //4
            "", //5
            "F5", //6
            "", //7
            "", //4
            "", //5
            "F5", //6
            "", //7
            "", //4
            "", //5
        };  

    }
}
