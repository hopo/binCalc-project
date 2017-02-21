package circuit.tester;

public class AdderTester {
	byte ia, ib;
	byte crri;
	void setOprands(int ia, int ib, int crri){
		this.ia=(byte)ia;
		this.ib=(byte)ib;
		this.crri=(byte)crri;
	}
	void run(){
		System.out.println(" 000"+ia);
		System.out.println("+000"+ib);
		System.out.print(" 00"+Adder.FAco(ia,ib,crri));
		System.out.print(Adder.FAso(ia,ib,crri));
		//System.out.println("_N : "+Gate.NAND(ia, ib));
		//System.out.println("_X : "+Gate.XOR(ia, ib));
		//Adder.FA(ia, ib, crri);
	}
	public static void main(String[] args){
		AdderTester T = new AdderTester();
		T.setOprands(1,1,0);
		T.run();
		}
}