Sub A_Startfresh()

Range("A1:AZ1").AutoFilter
Range("A:AZ").ClearContents
Columns("A:AZ").Select
    Selection.Delete Shift:=xlToLeft
 
 
End Sub

Sub B_CleanupCasement()

    'Sub DeleteRowWithContents()

    With ActiveSheet
    .AutoFilterMode = False
    With Range("A1", Range("A" & Rows.Count).End(xlUp))
        .AutoFilter 1, "*Date*"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With

    With ActiveSheet
    .AutoFilterMode = False
    With Range("A1", Range("A" & Rows.Count).End(xlUp))
        .AutoFilter 1, "*---*"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With

    With ActiveSheet
    .AutoFilterMode = False
    With Range("A1", Range("A" & Rows.Count).End(xlUp))
        .AutoFilter 1, "*Renewal*"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
        End With
    .AutoFilterMode = False
    End With

    'End Sub
    
    'Sub Delete_Blank_Rows()

    'Step1:  Declare your variables.
    Dim myRange As Range
    Dim iCounter As Long

    'Step 2:  Define the target Range.
    Set myRange = ActiveSheet.UsedRange
    
    'Step 3:  Start reverse looping through the range.
    For iCounter = myRange.Rows.Count To 1 Step -1
    
    'Step 4: If entire row is empty then delete it.
       If Application.CountA(Rows(iCounter).EntireRow) = 0 Then
       Rows(iCounter).Delete
       End If

    'Step 5: Increment the counter down
    Next iCounter
    
    'End Sub
    
    


'End Sub
    
    
    
'Sub duplicate1()
'


Range("a1").Resize(d.Count) = Application.Transpose(d.keys)


'Sub SortUp() 'Excel VBA for a sort (ascending).
Range("A:A").Sort _
Key1:=Range("A1"), Order1:=xlAscending
'End Sub

' duplicate1 Macro
'
    ActiveSheet.Range("$A$1:$A$1500").RemoveDuplicates Columns:=1, Header:=xlNo

'End Sub


'Sub Range_Find_Method()
'Finds the last non-blank cell on a sheet/range.

Dim lRow As Long
Dim lCol As Long
    
    lRow = Cells.Find(What:="*", _
                    After:=Range("A1"), _
                    LookAt:=xlPart, _
                    LookIn:=xlFormulas, _
                    SearchOrder:=xlByRows, _
                    SearchDirection:=xlPrevious, _
                    MatchCase:=False).Row
    
   ' MsgBox "Last Row: " & lRow

'End Sub


'Sub ExampleSplit1()
    Columns(1).Select
    Selection.TextToColumns _
      Destination:=Range("A1"), _
      DataType:=xlDelimited, _
      TextQualifier:=xlDoubleQuote, _
      ConsecutiveDelimiter:=False, _
      Tab:=True, _
      Semicolon:=False, _
      comma:=False, _
      Space:=False, _
      Other:=True, _
      OtherChar:="|"

'Sub ExampleSplit2()
    Columns(2).Select
    Selection.TextToColumns _
      Destination:=Range("B1"), _
      DataType:=xlDelimited, _
      TextQualifier:=xlDoubleQuote, _
      ConsecutiveDelimiter:=False, _
      Tab:=True, _
      Semicolon:=False, _
      comma:=False, _
      Space:=False, _
      Other:=True, _
      OtherChar:="|"


'PURPOSE: Insert column(s) into the active worksheet
'SOURCE: www.TheSpreadsheetGuru.com

'Insert Column to the left of Column F
    Columns("F:F").Insert Shift:=xlToRight, _
      CopyOrigin:=xlFormatFromLeftOrAbove 'or xlFormatFromRightOrBelow

'End Sub

'Sub Paste_RangeT()
 
    'Cut and Paste a Range of Cells
    Range("U:U").Cut Range("F:F")
 
    Application.CutCopyMode = False
 
 
    Range("O:O").Cut Range("G:G")
 
    Application.CutCopyMode = False
    
    Range("G:G").Copy Range("AN:AN")

    Application.CutCopyMode = False
'End Sub

'Sub Modifications()

'Sub VBA_Clear_Contents_Range()
'Range("E:E").ClearContents
'End Sub

    Columns("G:G").Select
    Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove
    Range("G2").Select
    ActiveCell.FormulaR1C1 = "=LEFT(RC[-5],2)"
    Range("G2").Select
    Selection.AutoFill Destination:=Range("G2:G1500")
    Range("G2:G1500").Select
    
    Columns("H:H").Select
    Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove

   
    
'Private Sub NameCell()
With ActiveSheet
Range("G1").Value = "Product Type"
Range("H1").Value = "Int/Ext"
Range("I1").Value = "Unit Type"
Range("L1").Value = ""
Range("T1").Value = "Grille Type"


Range("AK1").Value = "Unique ID"
Range("AL1").Value = "New Batch"
Range("AM1").Value = "New Bin"
Range("AN1").Value = " "
Range("AO1").Value = " "
Range("AP1").Value = "Orig Type"

End With

'End Sub

Columns("G:G").Insert Shift:=xlToRight, _
      CopyOrigin:=xlFormatFromLeftOrAbove 'or xlFormatFromRightOrBelow

Range("J:J").Cut Range("G:G")
 
    Application.CutCopyMode = False
    
    

'Range("Q:Q").Cut Range("I:I")
 
 '   Application.CutCopyMode = Fal

'Sub sbVBS_To_Delete_EntireColumn()
Columns("J").EntireColumn.Delete
Columns("U:V").EntireColumn.Delete
Columns("M:S").EntireColumn.Delete
Columns("J:K").EntireColumn.Delete

Range("E:E").Cut Range("L:L")
 
    Application.CutCopyMode = False

Columns("E").EntireColumn.Delete

'End Sub

'identifying FF windows

Columns("I").Replace _
 What:="ff", Replacement:="if", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
'identifying Lines
 
 Columns("F").Replace _
 What:="    sag2", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="    sag1", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="   sash3", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="   sash2", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="   sash1", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
 
 Columns("F").Replace _
 What:="  frame", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True

 Columns("F").Replace _
 What:="    full", Replacement:="unit", _
 SearchOrder:=xlByColumns, MatchCase:=True
'Sub CellFit()
 
 Columns("E:W").HorizontalAlignment = xlCenter
' With Range("J:K").Font
'    .ColorIndex = 1
'    .Bold = True
'End With
'End Sub

 'copying existing batch/bin
    
'    Range("J2").Select
'    Application.CutCopyMode = False
'    ActiveCell.FormulaR1C1 = "=RC[-7]"
'    Range("K2").Select
'    Application.CutCopyMode = False
'    ActiveCell.FormulaR1C1 = "=RC[-7]"
'    Range("J2:K2").Select
'    Selection.AutoFill Destination:=Range("J2:K500")
'    Range("J2:K500").Select
    
 'creating color of int/ext
    'Columns("H:H").Select
    'Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove
    Range("H2").Select
    ActiveCell.FormulaR1C1 = "=MID(RC[-6],5,4)"
    Range("H2").Select
    Selection.AutoFill Destination:=Range("H2:H1500")
    Range("H2:H1500").Select
    
    


'Sub ToText()
'deleting extra rows with "0"

 With ActiveSheet
    .AutoFilterMode = False
    With Range("J1", Range("J" & Rows.Count).End(xlUp))
        .AutoFilter 1, "0"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With
    
'old initial sort

Rows("1:1").Select
   Selection.AutoFilter
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("D1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("C1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
'    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT.SortFields.Clear
'    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT.SortFields.Add Key:=Range _
'        ("F1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
'        xlSortNormal
'    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.SORT
'        .Header = xlYes
'        .MatchCase = False
'        .Orientation = xlTopToBottom
'        .SortMethod = xlPinYin
'        .Apply
'    End With
    
    Columns("A:Y").AutoFit
    
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("K1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("H1"), SortOn:=xlSortOnValues, Order:=xlDescending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
   
    
End Sub
 
 
 Sub E_CreateCSV()
 
 'Sub complete()
'
' complete Macro
'
    
    
 'create new file before final modifications

 Dim IntialName As String
Dim sFileSaveName As Variant
IntialName = "CSPRESEQXXXXb"
sFileSaveName = Application.GetSaveAsFilename(InitialFileName:=InitialName, fileFilter:="Excel Files (*.xlsm), *.xlsm")
If sFileSaveName <> False Then
ActiveWorkbook.SaveAs sFileSaveName
End If

    'ThisWorkbook.ActiveSheet.Copy _
    'Before:=Workbooks.Add.Worksheets(1)
    
    
    Rows("1:1").Select
    Application.CutCopyMode = False
    Selection.Delete Shift:=xlUp
    Cells.Select
    Selection.NumberFormat = "@"
 
 'End Sub
 'save file as csv in specfic folder
    'ThisWorkbook.ActiveSheet
    'Sheets("Sheet1").Select
    'ActiveWindow.SelectedSheets.Delete

   'Sub sbSaveExcelDialog()
'Saving file to user specified location

Application.DisplayAlerts = False
    Dim Name As String
    Dim FileName As String
    Name = ActiveSheet.Name
    FileName = ThisWorkbook.Path & "\" & ActiveWorkbook.Name & ".csv"
   
   ActiveWorkbook.SaveAs FileName:= _
        ThisWorkbook.Path & "\" & ActiveWorkbook.Name & ".csv", FileFormat:=xlCSV, _
        CreateBackup:=False
    
  MsgBox "File " & Name & " has been Created and Saved under:  " & FileName, , "Copy & Save Report"
  ActiveWorkbook.Close
  Application.DisplayAlerts = True

'End Sub

End Sub


Sub D_SortforCasement()
'sort commands for buttons
' SortforSequence Macro
'

'
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("D1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("C1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
    
    
End Sub


Sub C_BatchBin()

'current sequence for casement is:
'   100)  CT
'   200)  FW
'   300)  CS
'   400)  CD
'   500)  CS
'   600)  CS
'   700)  CD
'   800)  AN
'   900)  CS
'   950)  Sash/Frame


'unique ID
'labels all CT, FW, and AN witn specific number
        Range("M2").Select
    ActiveCell.FormulaR1C1 = _
        "=IF(RC[-6]=""CT"",100,IF(RC[-6]=""FW"",800,IF(RC[-6]=""AN"",200,0)))"
'trims frame type
    Range("N2").Select
    ActiveCell.FormulaR1C1 = "=TRIM(RC[-5])"
'concatenates UNIT TYPE, INT/EXT, FRAME TYPE, and SPECIFIC #
    Range("O2").Select
    ActiveCell.FormulaR1C1 = _
        "=CONCATENATE((TRIM(RC[-4])),RC[-8],RC[-7],RC[-1],RC[-2])"
'counts specific unit types
    Range("Q2").Select
    ActiveCell.FormulaR1C1 = "=COUNTIF(R2C15:RC[-2],RC[-2])&RC[-2]"
'ID's number in characters of column N
    Range("U2").Select
    ActiveCell.FormulaR1C1 = _
        "=MIN(SEARCH({0,1,2,3,4,5,6,7,8,9},RC[-6]&""0123456789""))"
'extracts number from Column N
    Range("V2").Select
    ActiveCell.FormulaR1C1 = "=RIGHT(RC[-7], LEN(RC[-7])-RC[-1]+1)"
'creates number based on a max 9 digit length sequence
    Range("W2").Select
    ActiveCell.FormulaR1C1 = "=SUM(COUNTIF(R2C15:RC[-8],RC[-8])+100)"
'creates UNIQUE ID for each line
    Range("Y2").Select
    ActiveCell.FormulaR1C1 = "=CONCATENATE(RC[-5],RC[-2],RC[-12])"
'copy and pastes all formulas throughout file
    Range("M2:Y2").Select
    Selection.AutoFill Destination:=Range("M2:Y1500"), Type:=xlFillDefault
    Range("M2:Y1500").Select
'concatenates Int/Ext and Frame type
    Range("S2").Select
    ActiveCell.FormulaR1C1 = "=CONCATENATE((TRIM(RC[-8])),RC[-11],RC[-10])"
'identifies each similar color and frame type into a group
    Range("T2").Select
    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
    Range("S2:T2").Select
    Selection.AutoFill Destination:=Range("S2:T1500"), Type:=xlFillDefault
    Range("S2:T1500").Select
    
    
    
   Dim myRng As Range, cell As Range
Set myRng = Range("M2:M1500")

For Each cell In myRng

'CS
    If Range("G" & cell.Row) = "CS" Then Range("M" & cell.Row) = "300"
    If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "300" Then Range("M" & cell.Row) = "500"
    If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "500" Then Range("M" & cell.Row) = "600"
    If Range("G" & cell.Row) = "CS" And Range("M" & cell.Row - 1) = "600" Then Range("M" & cell.Row) = "900"

'CD
    If Range("G" & cell.Row) = "CD" Then Range("M" & cell.Row) = "400"
    If Range("G" & cell.Row) = "CD" And Range("M" & cell.Row - 1) = "400" Then Range("M" & cell.Row) = "700"
    'Else: Range("L" & cell.Row) = 7
    
'Sash/Frame
    If Range("F" & cell.Row) = "NonF" Then Range("M" & cell.Row) = "950"

    
    Next cell
    
    
'deletes empty rows
    
     With ActiveSheet
    .AutoFilterMode = False
    With Range("M1", Range("M" & Rows.Count).End(xlUp))
        .AutoFilter 1, "0"
        On Error Resume Next
        .Offset(1).SpecialCells(12).EntireRow.Delete
    End With
    .AutoFilterMode = False
    End With
    
'sorts based on UNIQUE ID (COLUMN w)


Range("A1:AD1").Select
    Selection.AutoFilter
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort.SortFields.Add Key:=Range _
        ("Y1"), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:= _
        xlSortTextAsNumbers
    With ActiveWorkbook.Worksheets("Sheet1").AutoFilter.Sort
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    
'Assign values to batch and bin

    Range("Z2").Select
    ActiveCell.FormulaR1C1 = "2"
    Range("AA2").Select
    ActiveCell.FormulaR1C1 = "2"
    Range("Z3").Select
    ActiveCell.FormulaR1C1 = "=R[-1]C+2"
    Range("AA3").Select
    ActiveCell.FormulaR1C1 = "=R[-1]C+2"
    Range("Z3:AA3").Select
    Selection.AutoFill Destination:=Range("Z3:AA1500"), Type:=xlFillDefault
    Range("Z3:AA1500").Select

'    Range("X2").Select
'    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
'    Range("Y2").Select
'    ActiveCell.FormulaR1C1 = "=IF(COUNTIF(R2C[-1]:RC[-1],RC[-1])=1,MAX(R1C:R[-1]C)+1,VLOOKUP(RC[-1],R1C[-1]:R[-1]C,2,0))"
'    Range("X2:Y2").Select
'    Selection.AutoFill Destination:=Range("X2:Y500"), Type:=xlFillDefault
'    Range("X2:Y500").Select

'hide cells

    Columns("L:X").Select
    Range("X1").Activate
    Selection.EntireColumn.Hidden = True

    Columns("AC").Select
    Range("AC1").Activate
    Selection.EntireColumn.Hidden = True

'copy and paste new batch/bin into correct locations

'   Selection.AutoFilter
    Columns("Z:AA").Select
    Selection.Copy
    Range("C1").Select
    Selection.PasteSpecial Paste:=xlPasteValues, Operation:=xlNone, SkipBlanks _
        :=False, Transpose:=False
    


    Columns("G:G").Select
    Selection.FormatConditions.Add Type:=xlTextString, String:="CT", _
        TextOperator:=xlContains
    Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
    With Selection.FormatConditions(1).Font
        .Color = -16383844
        .TintAndShade = 0
    End With
    With Selection.FormatConditions(1).Interior
        .PatternColorIndex = xlAutomatic
        .Color = 13551615
        .TintAndShade = 0
    End With
    Selection.FormatConditions(1).StopIfTrue = False
    Selection.FormatConditions.Add Type:=xlTextString, String:="CD", _
        TextOperator:=xlContains
    Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
    With Selection.FormatConditions(1).Font
        .Color = -16383844
        .TintAndShade = 0
    End With
    With Selection.FormatConditions(1).Interior
        .PatternColorIndex = xlAutomatic
        .Color = 13551615
        .TintAndShade = 0
    End With
    Selection.FormatConditions(1).StopIfTrue = False
    
    Columns("AD:AD").Select
    Selection.FormatConditions.Add Type:=xlTextString, String:="sash", _
        TextOperator:=xlContains
    Selection.FormatConditions(Selection.FormatConditions.Count).SetFirstPriority
    With Selection.FormatConditions(1).Font
        .Color = -16383844
        .TintAndShade = 0
    End With
    With Selection.FormatConditions(1).Interior
        .PatternColorIndex = xlAutomatic
        .Color = 13551615
        .TintAndShade = 0
    End With
   


End Sub
