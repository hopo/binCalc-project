package javapractice;

class Calculator{
	int left, right;
	public Calculator(){}
	public Calculator(int left, int right){
		this.left=left;
		this.right=right;
	}
	public void sum(){
		System.out.println("sum: "+(this.left+this.right));
	}
	public void sub(){
		System.out.println("sub: "+(this.left-this.right));
	}
}
class MultiCalculator extends Calculator{
	public MultiCalculator (int mleft, int mright){
		this.left=mleft;
		this.right=mright;
	}
	public void multi(){
		System.out.println("multi: "+(this.left*this.right));
	}
}
public class kCalculator {
	public static void main(String[] args){
		Calculator c1=new Calculator(2,4);
		c1.sum();
		c1.sub();
		
		MultiCalculator m1=new MultiCalculator(10,20);
		m1.sum();
		m1.sub();
		m1.multi();
	}
}