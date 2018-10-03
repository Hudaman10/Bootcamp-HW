Attribute VB_Name = "Module1"
Sub stock()


Dim Ticker As String
Dim Yearly_Change As Double
Dim Counter As Integer
Dim Percent_Change As Double
Dim Total_Stock_Volume As Double


lastrow = Cells(Rows.Count, 1).End(xlUp).Row


Dim Ticker_Row As Integer
Ticker_Row = 2

Total_Stock_Volume = 0
Yearly_Change = 0
Counter = 0

Range("I1").Value = "Ticker"
Range("J1").Value = "Yearly Change"
Range("K1").Value = "Percent Change"
Range("L1").Value = "Total Stock Volume"

For i = 2 To lastrow

' Searches for when the value of the next cell is different than that of the current cell
    If Cells(i + 1, 1).Value <> Cells(i, 1).Value Then
       
       Ticker = Cells(i, 1).Value
       
       Total_Stock_Volume = Total_Stock_Volume + Cells(i, 7).Value
       
       Yearly_Change = Cells(i, 6).Value - Cells(i - Counter, 3).Value
       
       Percent_Change = (Cells(i - Counter, 3).Value / Cells(i, 6).Value)
            
       Range("I" & Ticker_Row).Value = Ticker
       
       Range("L" & Ticker_Row).Value = Total_Stock_Volume
       
       Range("J" & Ticker_Row).Value = Yearly_Change
       
       Range("K1" & Ticker_Row).Value = Percent_Change
       
            'If Yearly_Change < 0 Then
            'Cells(Ticker_Row, 10).Interior = 3
            
            'ElseIf Percent_Change < 0 Then
            'Cells(Ticker_Row, 11).Interior = 3
            
            'End If
       
       Ticker_Row = Ticker_Row + 1
       
       Total_Stock_Volume = 0
       
       Counter = 0
    
    Else
        Total_Stock_Volume = Total_Stock_Volume + Cells(i, 7).Value
        Counter = Counter + 1
        
    End If

  Next i



End Sub
