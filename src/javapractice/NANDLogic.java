package javapractice;

public class NANDLogic{
	byte ia,ib;
	public NANDLogic(int ia,int ib){
		this.ia=(byte)ia;
		this.ib=(byte)ib;			
	}
	byte output(){
		if((this.ia==1)&&(this.ib==1)){
			return 0;
		}else{
			return 1;
		}
	}
	void run(){
		System.out.println("[[ NAND Logic ]]\n");
		System.out.println("ia: "+this.ia);
		System.out.println("ib: "+this.ib);
		System.out.println("Q: "+output());		
	}
	public static void main(String[] args){
		NANDLogic NA = new NANDLogic(1,1);
		NA.run();		
	}
}