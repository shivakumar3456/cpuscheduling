  var burst=[];
var complete=[];
var arr=[];
var num;
var comp;
var pri=[];
var pro=[];
var rq=[];
var tq;
var dup=[];
var indicate=0;
function myfirst(){
   
       
   var p=document.getElementById("select").selectedIndex;
     document.getElementById("naming").innerHTML=document.getElementById("select").options[p].value;
    if(document.getElementById("select").options[p].value=="round robin"){
        indicate=1;
        console.log("shiva");
        
        document.getElementById("lb").innerHTML="enter the time quantum :";
    }else{
       indicate=0; document.getElementById("naming").innerHTML="preemptive priority";
    }
}
function myFunction() {
  	
  var i;
    num=Number(document.getElementById("p1").value);
    burst=document.getElementById("p2").value.split(',');
    dup=document.getElementById("p2").value.split(',');
    arr=document.getElementById("p3").value.split(',');
    if(indicate==0){
    pri=document.getElementById("p4").value.split(',');
        
    }
    else{
      tq=Number(document.getElementById("p4").value);  
    }
console.log(burst,arr,tq);
   comp=0;
    for(i=1;i<=num;i++)
    {
        complete[i-1]=0;
        burst[i-1]=Number(burst[i-1]);
       dup[i-1]=Number(burst[i-1]);
        arr[i-1]=Number(arr[i-1]);
    	pro[i-1]=i;
        if(indicate==0){
        pri[i-1]=Number(pri[i-1]);
        }
        comp=comp+burst[i-1];
    }	
     console.log(burst);
    myfun1();
}
function myfun1()
{
var i;
var j;var temp;
	for(i=0;i<num;i++)
    {
    for(j=i+1;j<num;j++)
        {
        	if(arr[i]>arr[j])
            {
            	temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
                temp=burst[i];
                burst[i]=burst[j];
                burst[j]=temp;
                 temp=dup[i];
                dup[i]=dup[j];
                dup[j]=temp;
                temp=pro[i];
                pro[i]=pro[j];
                pro[j]=temp;
                if(indicate==0){
                temp=pri[i];
                pri[i]=pri[j];
                pri[j]=temp;
                }
                }
            }
     }
    if(indicate==0){
     myfun2();
    }
    else{
        myfun4();
    }
  }
  function checkpri(pointer)
   {
       var rpointer=0;
       var prior;
       var set=0;
            for(var i=0;i<=pointer;i++)
                {
                    if(set==0){
                    if(rq[i]!=-1)
                        {
                            set=1;
                            prior=pri[i];
                            rpointer=i;
                        }
                    }
                    else{
                    if((pri[i]<prior)&&(rq[i]!=-1))
                        {
                            rpointer=i;
                            prior=pri[i];
                        }
                    }
                }
            
        
       return rpointer;
   }
function myfun4(){
      var str="<table><tr>";
  	var hack=1;
    var j=0;
   var check=0;
      var main;
    var start=0;
      var pointer=0;
    var label;
    var ck=0;
 /*   var rq=[comp];
    for(var i=0;i<comp;i++){
        rq[i]=0;
    }
  */	for(var i=0;(i<comp);i++)
    {
        while(i==arr[j]){
            console.log("while");
            rq[pointer]=pro[j];
            j++;
            pointer++;
            check=1;
        }
        if(ck==1){
            rq[pointer]=label;
            ck=0;
            pointer++;
        }
        if(check==1){
            for(var ki=0;(ki<num);ki++)
                {
                    if(rq[start]==pro[ki]){
                        main=ki;
                        break;
                    }
                }
           str=str+"<th>p"+(rq[start].toString())+"</th>";
                       if((i%10)==0&&(i!=0)){
                            str=str+"</tr></br></br><tr>";
                        }      
                 burst[main]=burst[main]-1;
     
            if(burst[main]==0)
            {
                complete[main]=i+1;
                start++;
                hack=0;
            } 
            if(((hack%tq)==0) &&(hack!=0)&&(burst[main]!=0)){
                label=rq[start];
               start++;
                ck=1;
               hack=0;
            } 
               hack++;
        console.log("rq "+rq);
    }}
      str=str+"</tr></table>";
      document.getElementById("demo1").innerHTML=str;
        myfun3();
}
  function myfun2()
  {
      var str="<table><tr>";
  	var hack=0;
    var j=0;
   var check=0;
      var main;
      var pointer=0;
  	for(i=0;i<=comp;i++)
    {
        while(i==arr[j]){
            rq[j]=pro[j];
            j++;
            check=1;
        }
        if(check==1){
        main=checkpri(j-1);
            
        hack=-1;
            if(rq[main]!=-1)
                {
                     str=str+"<th>p"+rq[main].toString()+"</th>";
                        if((i%10)==0&&(i!=0)){
                            str=str+"</tr><br><tr>";
                        }      
                    burst[main]=burst[main]-1;
                    hack=burst[main];
                }
     
            if(hack==0)
            {
                complete[main]=i+1;
                rq[main]=-1;
            }
       
        }   
    }
      str=str+"</tr></table>";
      document.getElementById("demo1").innerHTML=str;
      myfun3();
    }
function myfun3()
{var atat=0;
 var waiting=0;
 var pp=0;
    var i,j,k;
    var str="<table style='border-collapse'>";
    str=str+"<tr><th>process</th>";
    str=str+"<th>bursttime</th><th>arrivaltime</th>";
    str=str+"<th>completiontime</th>";
    if(indicate==0){ 
    str=str+"<th>prioity</th>";
    }
    str=str+"<th> TAT </th>";
    str=str+"<th>waiting time</th>";
    str=str+"</tr>";
    for(i=0;i<num;i++)
    {
        for(j=0;j<num;j++)
        {
            if(pro[j]==i+1)
            {
                str=str+"<tr><td>"+pro[j].toString()+"</td>";
                str=str+"<td>"+dup[j].toString()+"</td>";
                str=str+"<td>"+arr[j].toString()+"</td>";
             str=str+"<td>"+complete[j].toString()+"</td>";
                k=complete[j]-arr[j];
                atat=atat+k;
                console.log(complete[j]);
                if(indicate==0){
                str=str+"<td>"+pri[j].toString()+"</td>";
                }
                str=str+"<td>"+k.toString()+"</td>";
                waiting=k-dup[j];
                pp=pp+waiting;
                str=str+"<td>"+waiting.toString()+"</td>";
                    str=str+"</tr>";
                j=num+1;
            }
    }
   }
    str=str+"</table>";
    document.getElementById("demo").innerHTML=str;
 document.getElementById("cd1").innerHTML="avarage turn around time = "+(atat/num)+"<br>average waitng time = "+(pp/num);
 
}
       
