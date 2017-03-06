package circuit.tester;
public class Adder{
	public static byte HAso(byte ia, byte ib){		
		return Gate.XOR(ia, ib);
	}
	public static byte HAco(byte ia, byte ib){
		return Gate.AND(ia, ib);
	}
	public static byte FAso(byte ia, byte ib, byte crri){
		return Adder.HAso(crri, Adder.HAso(ia, ib));
	}
	public static byte FAco(byte ia, byte ib, byte crri){
		return Gate.OR(Adder.HAco(crri, Adder.HAso(ia, ib)), Adder.HAco(ia, ib));
	}
	public static void FA(byte ia, byte ib, byte crri){
		System.out.print(Adder.FAco(ia, ib, crri));
		System.out.print(Adder.FAso(ia, ib, crri));
	}
}