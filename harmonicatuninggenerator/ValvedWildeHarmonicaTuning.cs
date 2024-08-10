namespace Namespace;

public class ValvedWildeHarmonicaTuning : WildeHarmonicaTuning
{

    public ValvedWildeHarmonicaTuning()
    {
        TuningName = "valvedwildetuned";

        HalfStepBlowBend = new List<string>
        {
            "B3", //1
            "D4s", //2
            "F4s", //3
            "B4", //4
            "D5s", //5
            "D5s", //6
            "F5s", //7
            "B5", //8
            "D6s", //9
            "G6s" //10
        };
    }
}
