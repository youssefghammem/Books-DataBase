(function(Global)
{
 "use strict";
 var Books_DataBase,Client,database,_BooksDataBase_Templates,WebSharper,Strings,UI,Templating,Runtime,Server,ProviderBuilder,Handler,TemplateInstance,ListModel,Doc,Seq,Var$1,Client$1,Templates;
 Books_DataBase=Global.Books_DataBase=Global.Books_DataBase||{};
 Client=Books_DataBase.Client=Books_DataBase.Client||{};
 database=Client.database=Client.database||{};
 _BooksDataBase_Templates=Global["Books-DataBase_Templates"]=Global["Books-DataBase_Templates"]||{};
 WebSharper=Global.WebSharper;
 Strings=WebSharper&&WebSharper.Strings;
 UI=WebSharper&&WebSharper.UI;
 Templating=UI&&UI.Templating;
 Runtime=Templating&&Templating.Runtime;
 Server=Runtime&&Runtime.Server;
 ProviderBuilder=Server&&Server.ProviderBuilder;
 Handler=Server&&Server.Handler;
 TemplateInstance=Server&&Server.TemplateInstance;
 ListModel=UI&&UI.ListModel;
 Doc=UI&&UI.Doc;
 Seq=WebSharper&&WebSharper.Seq;
 Var$1=UI&&UI.Var$1;
 Client$1=UI&&UI.Client;
 Templates=Client$1&&Client$1.Templates;
 database.Create=function(title,author,published)
 {
  return database.New(title,author,published);
 };
 database.New=function(Title,Author,date)
 {
  return{
   Title:Title,
   Author:Author,
   date:date
  };
 };
 Client.Main$94$20=function(books,BookTitel,BookAuthor,Mainbooks,message)
 {
  return function()
  {
   books.Clear();
   Mainbooks.Iter(function(t)
   {
    if(!(Strings.Trim(t.Title)=="")&&t.Title.toLowerCase().indexOf(BookTitel.Get().toLowerCase())!=-1&&(!(Strings.Trim(t.Author)=="")&&t.Author.toLowerCase().indexOf(BookAuthor.Get().toLowerCase())!=-1))
     books.Append(database.Create(t.Title,t.Author,t.date));
   });
   message.Set(books.get_Length()===0?(books.Append(database.Create("","",0)),"the book \""+BookTitel.Get()+"\" is not found."):"the book \""+BookTitel.Get()+"\" is found, ");
  };
 };
 Client.Main$81$22=function(BookTitel,BookAuthor,message,Bookdate,Mainbooks,books)
 {
  return function()
  {
   if(BookTitel.Get()===""||BookAuthor.Get()==="")
    message.Set(" Please enter a valid input !");
   else
    {
     Mainbooks.Append(database.Create(BookTitel.Get(),BookAuthor.Get(),Bookdate.Get()));
     books.Clear();
     Mainbooks.Iter(function(t)
     {
      books.Append(database.Create(t.Title,t.Author,t.date));
     });
     message.Set(" The book \""+Global.String(BookTitel.Get())+"\" is added successfully.");
     BookTitel.Set("");
    }
  };
 };
 Client.Main=function()
 {
  var Mainbooks,books,data,message,BookTitel,BookAuthor,Bookdate,b,t,t$1,m,_this,_this$1,_this$2,_this$3,_this$4,p,i;
  function row(entry)
  {
   var b$1,_this$5,_this$6,_this$7,p$1,i$1;
   return(b$1=(_this$5=(_this$6=(_this$7=new ProviderBuilder.New$1(),(_this$7.h.push({
    $:1,
    $0:"title",
    $1:entry.Title
   }),_this$7)),(_this$6.h.push({
    $:1,
    $0:"author",
    $1:entry.Author
   }),_this$6)),(_this$5.h.push({
    $:1,
    $0:"published",
    $1:Global.String(entry.date)
   }),_this$5)),(p$1=Handler.CompleteHoles(b$1.k,b$1.h,[]),(i$1=new TemplateInstance.New(p$1[1],_BooksDataBase_Templates.row(p$1[0])),b$1.i=i$1,i$1))).get_Doc();
  }
  Mainbooks=ListModel.FromSeq([database.Create("The Great Gatsby","F. Scott Fitzgerald",1999),database.Create("Animal Farm","George Orwell",1999),database.Create("The Hobbit, or There and Back Again","J.R.R. Tolkien",1999),database.Create("The Diary of a Young Girl","Anne Frank",1999),database.Create("The Little Prince","Antoine de Saint-Exupéry",1999),database.Create("Fahrenheit 451","Ray Bradbury",1999),database.Create("The Catcher in the Rye","J.D. Salinger",1999)]);
  books=ListModel.FromSeq([]);
  books.Clear();
  Mainbooks.Iter(function(t$2)
  {
   books.Append(database.Create(t$2.Title,t$2.Author,t$2.date));
  });
  data=Doc.BindView(function(lm)
  {
   return Doc.Concat(Seq.map(row,lm));
  },books.v);
  message=Var$1.Create$1("");
  BookTitel=Var$1.Create$1("");
  BookAuthor=Var$1.Create$1("");
  Bookdate=Var$1.Create$1(2022);
  Var$1.Create$1("");
  return(b=(t=(t$1=(m=message.get_View(),(_this=(_this$1=(_this$2=(_this$3=(_this$4=new ProviderBuilder.New$1(),(_this$4.h.push({
   $:0,
   $0:"window",
   $1:data
  }),_this$4)),(_this$3.h.push({
   $:10,
   $0:"title",
   $1:BookTitel
  }),_this$3)),(_this$2.h.push({
   $:10,
   $0:"author",
   $1:BookAuthor
  }),_this$2)),(_this$1.h.push({
   $:13,
   $0:"date",
   $1:Bookdate
  }),_this$1)),(_this.h.push({
   $:2,
   $0:"message",
   $1:m
  }),_this))),(t$1.h.push(Handler.EventQ2(t$1.k,"register",function()
  {
   return t$1.i;
  },function()
  {
   if(BookTitel.Get()===""||BookAuthor.Get()==="")
    message.Set(" Please enter a valid input !");
   else
    {
     Mainbooks.Append(database.Create(BookTitel.Get(),BookAuthor.Get(),Bookdate.Get()));
     books.Clear();
     Mainbooks.Iter(function(t$2)
     {
      books.Append(database.Create(t$2.Title,t$2.Author,t$2.date));
     });
     message.Set(" The book \""+Global.String(BookTitel.Get())+"\" is added successfully.");
     BookTitel.Set("");
    }
  })),t$1)),(t.h.push(Handler.EventQ2(t.k,"search",function()
  {
   return t.i;
  },function()
  {
   books.Clear();
   Mainbooks.Iter(function(t$2)
   {
    if(!(Strings.Trim(t$2.Title)=="")&&t$2.Title.toLowerCase().indexOf(BookTitel.Get().toLowerCase())!=-1&&(!(Strings.Trim(t$2.Author)=="")&&t$2.Author.toLowerCase().indexOf(BookAuthor.Get().toLowerCase())!=-1))
     books.Append(database.Create(t$2.Title,t$2.Author,t$2.date));
   });
   message.Set(books.get_Length()===0?(books.Append(database.Create("","",0)),"the book \""+BookTitel.Get()+"\" is not found."):"the book \""+BookTitel.Get()+"\" is found, ");
  })),t)),(p=Handler.CompleteHoles(b.k,b.h,[["title",0,null],["author",0,null],["date",1,null]]),(i=new TemplateInstance.New(p[1],_BooksDataBase_Templates.mainform(p[0])),b.i=i,i))).get_Doc();
 };
 _BooksDataBase_Templates.row=function(h)
 {
  Templates.LoadLocalTemplates("main");
  return h?Templates.NamedTemplate("main",{
   $:1,
   $0:"row"
  },h):void 0;
 };
 _BooksDataBase_Templates.mainform=function(h)
 {
  Templates.LoadLocalTemplates("main");
  return h?Templates.NamedTemplate("main",{
   $:1,
   $0:"mainform"
  },h):void 0;
 };
}(self));
