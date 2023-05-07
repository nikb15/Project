

function CalculateMortage()
{
    amt = document.getElementById("amountId").value;
    roi= document.getElementById("ROIId").value;
    duration= document.getElementById("durationId").value;
    intrest =(amt*(roi*0.01))/duration
    payment = ((amt/duration)+intrest).toFixed(2);
    mv=document.getElementById("mortage_ans")
    mv.getElementById("mortage_value").innerHTML = payment
    console.log(`${amt}/${roi}/${duration}/${payment}`)
}


