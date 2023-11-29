using System.IO.Compression;
using System.Runtime.InteropServices.Marshalling;
using System.Text;

namespace Namespace;
public class TenHoleHarmonica
{

    public string TuningName;

     public List<string> WholeStepBlowBend;
     public List<string> HalfStepBlowBend;

     public List<string> BlowReed;

     public List<string> DrawReed;

     public List<string> HalfStepDrawBend;

     public List<string> WholeStepDrawBend;

     public List<string> ThreeSemitoneDrawBend;

     public string ToHtml()
     {
        var sb = new StringBuilder();
        sb.Append("`");
        //double blow bends
        convertNoteRowToHtml(WholeStepBlowBend, sb);

        //single blow bends
        convertNoteRowToHtml(HalfStepBlowBend, sb);

        //blow reeds
        convertNoteRowToHtml(BlowReed, sb);

        //draw reeds
        convertNoteRowToHtml(DrawReed, sb);

        //draw bends
        convertNoteRowToHtml(HalfStepDrawBend, sb);

        //double draw bends
        convertNoteRowToHtml(WholeStepDrawBend, sb);

        //triple draw bends
        convertNoteRowToHtml(ThreeSemitoneDrawBend, sb);

        sb.Append("`,");

        return sb.ToString();



     }

     private void convertNoteRowToHtml(List<string> noteRow, StringBuilder sb)
     {
        if (noteRow != null)
        {
            sb.AppendLine("<tr>");
            foreach (var note in noteRow)
            {
                if (note == string.Empty)
                {
                    sb.AppendLine(@"<td><img src=""blank.png"" width=""63"" height=""63""></td>");
                }
                else
                {
                    sb.AppendLine(@"<td><img name=""" + note + @""" src=""blank.png"" width=""63"" height=""63""></td>""");
                }
            }
            sb.AppendLine("</tr>");
        }
     }
}
