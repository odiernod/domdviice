﻿namespace Namespace;
public class TestChromatic10Tuning : TenHoleHarmonica
{

    public TestChromatic10Tuning()
    {
        TuningName = "TestChromatic10Tuning"; //Paddy Wilde Chromatic (need a better name)

        HalfStepBlowBend = new List<string>
        {
            "B4", //4
            "C5s", //5
            "D5s", //6
            "G5s", //7
            "B5", //4
            "C6s", //5
            "D6s", //6
            "G6s", //7
            "B6", //4
            "C6s", //5  
        };

        BlowReed = new List<string>
        {
            "C5", //4
            "D5", //5
            "E5", //6
            "A5", //7
            "C6", //4
            "D6", //5
            "E6", //6
            "A6", //7
            "C7", //4
            "D7", //5
        };

        DrawReed = new List<string>
        {
            "D5", //4
            "F5", //5
            "G5", //6
            "B5", //7
            "D6", //4
            "F6", //5
            "G6", //6
            "B6", //7
            "D7", //4
            "F7", //5
        };

        HalfStepDrawBend = new List<string>
        {
           "C5s", //4
            "E5", //5
            "F5s", //6
            "A5s", //7
            "C6s", //4
            "E6", //5
            "F6s", //6
            "A6s", //7
            "C7s", //4
            "E7", //5
        };

        WholeStepDrawBend = new List<string>()
        {
           "", //4
            "D5s", //5
            "F5", //6
            "", //7
            "", //4
            "D6s", //5
            "F6", //6
            "", //7
            "", //4
            "D7s", //5
        };  

    }
}
