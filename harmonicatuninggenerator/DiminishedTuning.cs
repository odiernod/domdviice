using Namespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace harmonicatuninggenerator
{
    internal class Diminished10Tuning : TenHoleHarmonica
    {
        public Diminished10Tuning()
        {
            TuningName = "Diminished";

            BlowReed = new List<string>
        {
            "A3", //1
            "C4", //2
            "D4s", //3
            "F4s", //4
            "A4", //5
            "C5", //6
            "D5s", //7
            "F5s", //8
            "A5", //9
            "C6" //10
        };

            DrawReed = new List<string>
        {
            "B3", //1
            "D4", //2
            "F4", //3
            "G4s", //4
            "B4", //5
            "D5", //6
            "F5", //7
            "G5s", //8
            "B5", //9
            "D6" //10
        };

            HalfStepDrawBend = new List<string>
        {
            "A3s", //1
            "C4s", //2
            "E4", //3
            "G4", //4
            "A4s", //5
            "C5s", //6
            "E5", //7
            "G5", //8
            "A5s", //9
            "C6s" //10
        };
        }

    }
}
