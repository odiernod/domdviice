//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace harmonicatuninggenerator
//{
//    internal class TwelveHoleChromatic
//    {
//        public string TuningName;

//        public List<string> UpperWholeStepBlowBend;
//        public List<string> UpperHalfStepBlowBend;
//        public List<string> LowerWholeStepBlowBend;
//        public List<string> LowerHalfStepBlowBend;

//        public List<string> UpperBlowReed;

//        public List<string> UpperDrawReed;

//        public List<string> LowerBlowReed;

//        public List<string> LowerDrawReed;

//        public List<string> UpperHalfStepDrawBend;

//        public List<string> UpperWholeStepDrawBend;

//        public List<string> UpperThreeSemitoneDrawBend;

//        public List<string> LowerHalfStepDrawBend;

//        public List<string> LowerWholeStepDrawBend;

//        public List<string> LowerThreeSemitoneDrawBend;

//        public string ToHtml()
//        {
//            var sb = new StringBuilder();
//            sb.Append("`");
//            //double blow bends
//            convertNoteRowToHtml(WholeStepBlowBend, sb);

//            //single blow bends
//            convertNoteRowToHtml(HalfStepBlowBend, sb);

//            //blow reeds
//            convertNoteRowToHtml(BlowReed, sb);

//            //draw reeds
//            convertNoteRowToHtml(DrawReed, sb);

//            //draw bends
//            convertNoteRowToHtml(HalfStepDrawBend, sb);

//            //double draw bends
//            convertNoteRowToHtml(WholeStepDrawBend, sb);

//            //triple draw bends
//            convertNoteRowToHtml(ThreeSemitoneDrawBend, sb);

//            sb.Append("`,");

//            return sb.ToString();



//        }

//        private void convertNoteRowToHtml(List<string> noteRow, StringBuilder sb)
//        {
//            if (noteRow != null)
//            {
//                sb.AppendLine("<tr>");
//                foreach (var note in noteRow)
//                {
//                    if (note == string.Empty)
//                    {
//                        sb.AppendLine(@"<td><img src=""blank.png"" width=""63"" height=""63""></td>");
//                    }
//                    else
//                    {
//                        sb.AppendLine(@"<td><img name=""" + note + @""" src=""blank.png"" width=""63"" height=""63""></td>""");
//                    }
//                }
//                sb.AppendLine("</tr>");
//            }
//        }
//    }
//}
