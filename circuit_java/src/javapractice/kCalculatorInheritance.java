package javapractice;

class DivCalculator extends MultiCalculator{
	public DivCalculator(int left, int right){
		super(left,right); //parameter of super
	}
	public void div(){
		System.out.println("div: "+(left/right));
	}
}
public class kCalculatorInheritance {
	public static void main(String[] args){
		DivCalculator d1=new DivCalculator(10,2);
		d1.sum();
		d1.sub();
		d1.multi();
		d1.div();
	}
}
