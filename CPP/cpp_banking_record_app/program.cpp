#include <iostream>
#include <fstream>
#include <cstdlib>
using namespace std;


class account_query{
    char account_number[20];
    char firstName[20];
    char lastName[20];
    float total_balance;

    public:
        void read_data();
        void show_data();
        void write_rec();
        void read_rec();
        void search_rec();
        void edit_rec();
        void delete_rec();
};

void account_query::read_data(){
    cout<<"\nEnter Acoount Number :";
    cin>>account_number;
    cout<<"\nEnter First Name :";
    cin>>firstName;
    cout<<"\nEnter Last Name :";
    cin>>lastName;
    cout<<"\nEnter Total Balance :";
    cin>>total_balance;
    cout<<endl;
}

void account_query::show_data()
{
    cout<<"Account Number : "<<account_number<< endl;
    cout<<"First Name : "<<firstName<< endl;
    cout<<"Last Name : "<<lastName<< endl;
    cout<<"Current balance: "<<total_balance<<endl;
    cout<<"-----------------------------"<<endl;

}

void account_query::write_rec(){
    ofstream outfile;
    outfile.open("record.bank",ios::binary| ios::app);
    read_data();
    outfile.write(reinterpret_cast<char *>(this),sizeof(*this));
    outfile.close(); 
}

void account_query::read_rec()
{
    ifstream infile;
    infile.open("record.bank", ios::binary);
    if(!infile)
    {
        cout<<"Error in Opening! File Not Found!!"<<endl;
        return;
    }
    cout<<"\n***Data from file****"<<endl;
    while(!infile.eof())
    {
        if(infile.read(reinterpret_cast<char*>(this), sizeof(*this))>0)
        {
            show_data();
        }
    }
    infile.close();
}

void account_query::delete_rec()
{
    int n;
    ifstream infile;
    infile.open("record.bank",ios::binary);
    if(!infile)
    {
        cout<<"Error in Opening! File Not Found!!"<<endl;
        return;
    }
    infile.seekg(0,ios::end);
    int count = infile.tellg()/sizeof(*this);
    cout<<"\n There are "<<count<<" record in the file";
    cout<<"\n Enter Record Number to delete: ";
    cin>>n;
    fstream tmpfile;
    tmpfile.open("tmpfile.bank", ios::out|ios::binary);
    infile.seekg(0);
    for(int i=0; i<count; i++)
    {
        infile.read(reinterpret_cast<char*>(this),sizeof(*this));
        if(i==(n-1))
            continue;
        tmpfile.write(reinterpret_cast<char*>(this), sizeof(*this));
    }
    infile.close();
    tmpfile.close();
    remove("record.bank");
    rename("tmpfile.bank", "record.bank");
}

void account_query::search_rec()
{
    int n;
    ifstream infile;
    infile.open("record.bank",ios::binary);
    if(!infile)
    {
        cout<<"Error in opening the file";
        return; 
    }
    infile.seekg(0,ios::end);
    int count = infile.tellg()/sizeof(*this);
    cout<<"\n There are "<<count<<" record in the file";
    cout<<"\n Enter record number to search: ";
    cin>>n;
    infile.seekg((n-1)*sizeof(*this));
    infile.read(reinterpret_cast<char*>(this), sizeof(*this));
    show_data();


}



int main()
{
    account_query A;
    int choice;
    cout<<"***Account Information System***"<<endl;
    while(true)
    {
        cout<<"Select one option below ";
        cout<<"\n\t1-->Add record to file";
        cout<<"\n\t2-->Show record to file";
        cout<<"\n\t3-->Search record from file";
        cout<<"\n\t4-->Update record";
        cout<<"\n\t5-->Delete record";
        cout<<"\n\t6-->Quit";
        cout<<"\nEnter your choice: ";
        cin>>choice;
        switch(choice)
        {
        case 1:
            A.write_rec();
            break;
        case 2:
            A.read_rec();
            break;
        case 3:
            A.search_rec();
            break;
        case 4:
            A.edit_rec();
            break;
        case 5:
            A.delete_rec();
            break;
        case 6:
            exit(0);
            break;
        default:
            cout<<"\nEnter correct choice";
            exit(0);
        }
    }
    system("pause");
    return 0;
}
 