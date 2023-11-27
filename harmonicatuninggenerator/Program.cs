// See https://aka.ms/new-console-template for more information

using Namespace;

var generator = new TuningGenerator();

var tuningName = "PaddyWildeTuned";

var tuningTemplateInC = 
@"<tr>
<td>Eb4<img name=""D4s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td>Eb5<img name=""D5s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F5s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""D6s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""G6s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
</tr>
<tr>
<td><img name=""C4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""E4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""C5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""E5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""E5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""C6"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""E6"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A6""src=""blank.png"" width=""63"" height=""63""></td>
</tr>
<tr>
<td><img name=""D4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""G4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""B4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""D5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""G5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""B5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""D6"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""G6"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""C7"" src=""blank.png"" width=""63"" height=""63""></td>
</tr>
<tr>
<td><img name=""C4s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F4s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A4s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""C5s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F5s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A5s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""C6s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F6s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""B6"" src=""blank.png"" width=""63"" height=""63""></td>
</tr>
<tr>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A4"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F5""  src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A5"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""F6"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""A6s"" src=""blank.png"" width=""63"" height=""63""></td>
</tr>
<tr>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""G4s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img name=""G5s"" src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
<td><img src=""blank.png"" width=""63"" height=""63""></td>
</tr>";

