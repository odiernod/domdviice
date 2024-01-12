using Namespace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace harmonicatuninggenerator
{
    internal class Augmented10Tuning : TenHoleHarmonica
    {
        public Augmented10Tuning()
        {
            TuningName = "Augmented10";

            BlowReed = new List<string>
            {
                "C4", //1
                "E4", //2
                "G4s", //3
                "C5", //1
                "E5", //2
                "G5s", //3
                "C6", //1
                "E6", //2
                "G6s", //3
                "C7"
            };

            DrawReed = new List<string>
            {
                "D4s", //2
                "G4", //4
                "B4", //5
                "D5s", //2
                "G5", //4
                "B5", //5
                "D6s", //2
                "G6", //4
                "B6", //5
                "D7s"

            };

            HalfStepDrawBend = new List<string>
            {
                "D4", //2
                "F4s", //4
                "A4s", //5
                "D5", //2
                "F5s", //4
                "A5s", //5
                "D6", //2
                "F6s", //4
                "A6s", //5
                "D7"
            };

            WholeStepDrawBend = new List<string>
            {
                "C4s", //2
                "F4", //4
                "A4", //5
                "C5s", //2
                "F5", //4
                "A5", //5
                "C6s", //2
                "F6", //4
                "A6", //5
                "C7s"
            };
        }

    }
}
