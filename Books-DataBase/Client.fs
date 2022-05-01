namespace Books_DataBase

open WebSharper
open WebSharper.UI
open WebSharper.UI.Templating
open WebSharper.UI.Notation

open WebSharper.UI.Client

[<JavaScript>]
module Templates =

    type MainTemplate = Templating.Template<"Main.html", ClientLoad.FromDocument, ServerLoad.WhenChanged>

[<JavaScript>]
module Client =
    type database =
        {
            Title: string;
            Author: string;
            date: int;
        }
        static member Create title author published =
            {
                Title = title
                Author = author
                date = published
            }
    let Main () =
        
        let Mainbooks =
            ListModel.FromSeq [
                database.Create "The Great Gatsby" "F. Scott Fitzgerald" 1999
                database.Create "Animal Farm" "George Orwell" 1999
                database.Create "The Hobbit, or There and Back Again" "J.R.R. Tolkien" 1999
                database.Create "The Diary of a Young Girl" "Anne Frank" 1999
                database.Create "The Little Prince" "Antoine de Saint-Exupéry" 1999
                database.Create "Fahrenheit 451" "Ray Bradbury" 1999
                database.Create "The Catcher in the Rye" "J.D. Salinger" 1999
             

            ]

        let books = ListModel.FromSeq []
        books.Clear()
        Mainbooks.Iter(fun t ->
            database.Create (t.Title) (t.Author) (t.date) 
            |> books.Add )

        let row entry =
            
            Templates.MainTemplate.Row()
                .Title(entry.Title)
                .Author(entry.Author)
                .Published(string entry.date)

                .Doc()

        let data =
            books.View.Doc(fun lm -> 
                lm 
                |> Seq.map row
                |> Doc.Concat
            )
        


        let  message = Var.Create ""
        let BookTitel = Var.Create ""

        let BookAuthor = Var.Create ""

        let Bookdate = Var.Create 2022
        let rvReversed = Var.Create ""
        Templates.MainTemplate.MainForm()
            .window(data)
            .Title(BookTitel)
            .Author(BookAuthor)
            .Date(Bookdate)
            .message(message.View)
            .Register(fun _ ->
                if(BookTitel.Value = "" || BookAuthor.Value ="" )then message.Value <- (" Please enter a valid input !")
                else
                    database.Create (BookTitel.Value) (BookAuthor.Value) (Bookdate.Value)
                    |> Mainbooks.Add
                    books.Clear()
                    Mainbooks.Iter(fun t -> 
                        database.Create (t.Title) (t.Author) (t.date)
                        |> books.Add 
                        )
                    message.Value <- (" The book \"" + (string BookTitel.Value) +  "\" is added successfully.")
                    BookTitel.Value <- ""   
                )
            .Search(fun _ ->
                books.Clear()
                Mainbooks.Iter(fun t ->
                    if ( (not (t.Title.Trim().Equals(""))) && t.Title.ToLower().Contains(BookTitel.Value.ToLower()))
                    && ( (not (t.Author.Trim().Equals(""))) && t.Author.ToLower().Contains(BookAuthor.Value.ToLower())) then
                        database.Create (t.Title) (t.Author) (t.date)
                        |> books.Add
                    )
                message.Value <-
                    if (books.Length = 0) then
                        database.Create ("") ("") (0)
                        |> books.Add
                        "the book \"" + BookTitel.Value  + "\" is not found."
                    else
                        "the book \"" + BookTitel.Value +  "\" is found, "                 
                )
            .Doc()
